import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
import { basicProps } from './props';
import { ModalMethods, ModalProps } from './types';
import { Modal } from 'ant-design-vue';
import { buildUUID } from '@/utils/uuid';
import { deepMerge } from '@/utils';
import { isFunction } from '@/utils/is';
import { getSlot } from '@/utils/helper/tsxHelper';

export default defineComponent({
  name: 'BasicModal',
  props: basicProps,
  emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register'],
  setup(props, { slots, emit, attrs }) {

    const visibleRef = ref(false)
    const propsRef = ref<Partial<ModalProps> | null>(null)
    

    const getMergeProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as any)
      }
    })

    const getProps = computed((): any => {
      const opt = {
        ...props,
        ...((unref(propsRef) || {}) as any),
        visible: unref(visibleRef),
        // title: undefined
      }

      return {
        ...opt
      }
    })

    // 监测props.visible的变化，修改visibleRef
    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    // 根据visibleRef的变化，通知调用发visible-change
    watch(
      () => unref(visibleRef),
      (v: boolean) => {
        emit('visible-change', v)
      },
      {
        immediate: false
      }
    )

    

    // 取消事件
    async function handleCancel(e: Event) {
      e && e.stopPropagation()
      if (props.closeFunc && isFunction(props.closeFunc)) {
        const isClose: boolean = await props.closeFunc()
        visibleRef.value = !isClose
        return
      }
      visibleRef.value = false
      emit('cancel')
    }

    // 设置modal参数
    function setModalProps(props: Partial<ModalProps>): void {
      propsRef.value = deepMerge(unref(propsRef) || {}, props)
      if (!Reflect.has(props, 'visible')) return
      visibleRef.value = !!props.visible
    }

    const modalMethods: ModalMethods = {
      setModalProps
    }

    const uuid = buildUUID()
    console.log('register')
    emit('register', modalMethods, uuid)

    const renderContent = () =>{
      const children = getSlot(slots)
      return children
    }

    return () => (
      <Modal
        onCancel={handleCancel}
        {...{ ...attrs, ...props, ...unref(getProps) }}
      >
        {renderContent()}
      </Modal>
    )
  }
})