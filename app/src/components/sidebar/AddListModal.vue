<template>
  <BasicModal v-bind="$attrs" title="添加清单">
    <div class="add-list-modal__container">
      <div class="add-list-modal__item">
        <input
          type="text"
          autocomplete="off"
          placeholder="清单名称"
          class="add-list__input normal"
        />
      </div>
      <div class="add-list-modal__item">
        <div class="add-list-modal__lable">所属文件夹</div>
        <a-select @change="handleChange">
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
import { computed, defineComponent } from 'vue'
import { BasicModal, useModal } from '@/components/Modal'
import { projectStore } from '@/store/modules/project'
import { ProjectTypeEnum } from '@/enums/projectTypeEnum'
import AddDirModal from './AddDirModal.vue'

export default defineComponent({
  name: 'AddListModal',
  components: {
    BasicModal,
    AddDirModal
  },
  setup() {

    const [registerAddDirModal, dirModal] = useModal()

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

    return {
      list: computed(() => {
        const dir = projectStore.list.filter(item => item.type === ProjectTypeEnum.PROJECT)
        const noDir = {
          name: '无',
          type: 'EMPTY_DIR',
          id: 'no_dir',
        }
        return [noDir, ...dir]
      }),
      registerAddDirModal,
      addDir,
      afterAddDir
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