<template>
  <BasicModal
    v-bind="$attrs"
    title="删除清单"
    :okFunc="confirmFn"
    okType="danger"
    okText="确认"
  >
    <div class="del-confirm__container">
      {{ content }}
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { BasicModal } from '@/components/Modal'
// import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'DelConfirm',
  components: {
    BasicModal
  },
  props: {
    tip: {
      type: String,
      required: true
    }
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    // const { toast } = useMessage();
    const { tip: content } = toRefs(props)

    const confirmFn = () => {
      emit('confirm')
      return true;
    }

    return {
      confirmFn,
      content
    }
  }
})
</script>

<style lang="less">
@import (reference) "../../styles/rule.less";
</style>