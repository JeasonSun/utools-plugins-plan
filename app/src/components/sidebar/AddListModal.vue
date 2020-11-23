<template>
  <BasicModal v-bind="$attrs" title="添加清单" :okFunc="onOk">
    <div class="add-list-modal__container">
      <div class="add-list-modal__item">
        <a-input
          type="text"
          autocomplete="off"
          placeholder="清单名称"
          class="add-list__input normal"
          v-model:value="value"
        />
      </div>
      <div class="add-list-modal__item">
        <div class="add-list-modal__lable">所属文件夹</div>
        <a-select @change="handleChange" :value="selectId">
          <a-select-option :value="p.id" v-for="p in list" :key="p.id">
            <span>
              {{ p.name }}
            </span>
          </a-select-option>
        </a-select>
        <div class="add-list-modal__add-dir" @click="addDir">
          <i class="iconfont iconadddir" />
        </div>
      </div>
      <AddDirModal @register="registerAddDirModal" @after-add="afterAddDir" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref, watchEffect } from 'vue'
import { BasicModal, useModal } from '@/components/Modal'
import { projectStore } from '@/store/modules/project'
import { ProjectTypeEnum } from '@/enums/projectTypeEnum'
import AddDirModal from './AddDirModal.vue'
import { NO_DIR_ID } from '@/constant/default'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'AddListModal',
  components: {
    BasicModal,
    AddDirModal
  },
  emits: ['after-add'],
  setup(props, { emit }) {

    const [registerAddDirModal, dirModal] = useModal()
    const { toast } = useMessage();
    const selectIdRef = ref<Nullable<string>>(null)
    const valueRef = ref('');

    const dirList = computed(() => {
      const dir = projectStore.list.filter(item => item.type === ProjectTypeEnum.PROJECT)
      const noDir = {
        name: '无',
        type: 'EMPTY_DIR',
        id: NO_DIR_ID,
      }
      return [noDir, ...dir]
    })

    watchEffect(() => {
      const lists = unref(dirList)
      let defaultId = null
      if (lists.length >= 2) {
        defaultId = lists[1].id
      }
      selectIdRef.value = defaultId
    })

    // 打开添加文件夹的弹窗
    function addDir() {
      dirModal.openModal()
    }

    // 添加文件夹事件
    // 向store中提交新文件夹数据
    function afterAddDir(dirName: string) {
      console.log(dirName)
      projectStore.addDirAction(dirName)
    }

    function handleChange(value: string) {
      selectIdRef.value = value
    }

    function onOk() {

      const value = unref(valueRef);
      const dirId = unref(selectIdRef);
      if (!value || !value.length || !dirId) {
        toast.error('请输入文件夹名称');
        return false;
      } else {
        projectStore.addListByDirId( {
          listName: value, 
          dirId: dirId
        })
        // emit('after-add', value)
        return true;
      }
    }



    return {
      list: dirList,
      registerAddDirModal,
      addDir,
      afterAddDir,
      selectId: selectIdRef,
      handleChange,
      onOk,
      value: valueRef
    }
  }
})
</script>

<style lang="less">
@import (reference) "../../styles/rule.less";

.add-list-modal__container {
  .add-list-modal__item {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .add-list-modal__lable {
      width: 80px;
    }
    .ant-select {
      flex: 1;
    }
    .add-list-modal__add-dir {
      margin-left: 10px;
      color: @color-black;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
      }
    }
  }
}
</style>