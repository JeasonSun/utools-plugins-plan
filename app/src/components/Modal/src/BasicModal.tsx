import { getSlot } from '@/utils/helper/tsxHelper';
import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
import { basicProps } from './props';
import { ModalMethods, ModalProps } from './types';
import { BasicTitle } from '@/components/Basic';
import { Modal } from 'ant-design-vue';
import { buildUUID } from '@/utils/uuid';
import { deepMerge } from '@/utils';
import { isFunction } from '@/utils/is';

export default defineComponent({
  name: 'BasicModal',
  props: basicProps,
  emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register'],
  setup(props, { slots, emit, attrs }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<ModalProps> | null>(null)
    const modalWrapperRef = ref<any>(null)

    const extHeightRef = ref(0)
    const formerHeightRef = ref(0)
    const fullScreenRef = ref(false)

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
        title: undefined
      }

      const { wrapClassName = '' } = opt
      const className = unref(fullScreenRef) ? `${wrapClassName} fullscreen-modal` : wrapClassName

      return {
        ...opt,
        wrapClassName: className
      }
    })


    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    watch(
      () => unref(visibleRef),
      (v: boolean) => {
        emit('visible-change', v)
      },
      {
        immediate: false
      }
    )

    // 渲染标题
    // function renderTitle() {
    //   const { helpMessage } = unref(getProps)
    //   const { title } = unref(getMergeProps)
    //   return (
    //     <BasicTitle helpMessage={helpMessage}>
    //       {() => (slots.title ? getSlot(slots, 'title') : title)}
    //     </BasicTitle>
    //   )
    // }

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

    return () => (
      <Modal
        onCancel={handleCancel}
        {...{ ...attrs, ...props, ...unref(getProps) }}
      >
        <p>ssss</p>
      </Modal>
    )
  }
})