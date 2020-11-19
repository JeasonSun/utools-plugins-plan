<template>
  <BasicModal v-bind="$attrs" title="添加文件夹" :okFunc="onOk">
    <div class="add-dir-modal__container">
      <div class="add-list-modal__item">
        <a-input
          type="text"
          autocomplete="off"
          placeholder="文件夹名称"
          class="add-list__input normal"
          v-model:value="value"
        />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { BasicModal } from '@/components/Modal'
import { projectStore } from '@/store/modules/project'
import { ProjectTypeEnum } from '@/enums/projectTypeEnum'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'AddDirModal',
  components: {
    BasicModal
  },
  emits: ['after-add'],
  setup(props, { emit }) {
    const { toast } = useMessage();

    const valueRef = ref('');

    /**
     * 点击保存的回调
     * @return boolean 是否关闭弹窗
     */
    function onOk(): boolean {
      console.log('点击了OK')
      const value = unref(valueRef)
      if (!value || !value.length) {
        toast.error('请输入文件夹名称');
        return false;
      } else {
        emit('after-add', value)
        return true;
      }
    }
    return {
      onOk,
      value: valueRef
    }
  }
})
</script>

<style lang="less">
@import (reference) "../../styles/rule.less";
</style>