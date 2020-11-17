import { extendSlots } from '@/utils/helper/tsxHelper';
import { Modal } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { basicProps } from './props';


export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  setup(props, { attrs, slots }) {
    

    return () => {
      const propsData = { ...attrs, ...props } as any;
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
    };
  },
});
