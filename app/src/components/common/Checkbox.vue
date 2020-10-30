<template>
  <div
    class="plan-checkbox"
    :class="[checked ? 'checked' : '']"
    @click="onCheckedChange"
  >
    <span class="iconfont iconright" v-show="checked"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { isFunction } from '@/utils/is';


export default defineComponent({
  name: 'Checkbox',
  props: {
    onChange: {
      type: Function as PropType<Fn>,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const defaultChecked = props.value;
    const checked = ref(defaultChecked);
    const onCheckedChange = () => {
      checked.value = !checked.value;
      const { onChange } = props;
      if (onChange && isFunction(onChange)) {
        onChange(checked.value)
      }
    }
    return {
      checked,
      onCheckedChange
    }
  }
});
</script>

<style scoped lang="less">
.plan-checkbox {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #1890ff;
  border-radius: 100%;
  display: inline-block;
  cursor: pointer;
  position: relative;
  color: #ffffff;
  &.checked {
    background: #1890ff;
    box-shadow: 0px 1px 2px -2px rgba(11, 68, 223, 0.16),
      0px 3px 6px 0px rgba(11, 68, 223, 0.12),
      0px 5px 12px 4px rgba(11, 68, 223, 0.09);
  }
}
</style>
