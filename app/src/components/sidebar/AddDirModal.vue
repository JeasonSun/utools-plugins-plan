<template>
  <BasicModal v-bind="$attrs" title="添加文件夹">
    <div class="add-dir-modal__container">
      <div class="add-list-modal__item">
        <input
          type="text"
          autocomplete="off"
          placeholder="文件夹名称"
          class="add-list__input normal"
          @pressEnter="pressEnter"
        />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { BasicModal } from '@/components/Modal'
import { projectStore } from '@/store/modules/project'
import { ProjectTypeEnum } from '@/enums/projectTypeEnum'

export default defineComponent({
  name: 'AddDirModal',
  components: {
    BasicModal
  },
  setup() {

    function pressEnter(e: any){
      console.log(e)
    }
    return {
      pressEnter
    }
  }
})
</script>

<style lang="less">
@import (reference) "../../styles/rule.less";
</style>