import { PropType } from 'vue'

export const modalProps = {
  visible: Boolean as PropType<boolean>,
  draggable: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  centered: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  cancelText: {
    type: String as PropType<string>,
    default: '关闭',
  },
  okText: {
    type: String as PropType<string>,
    default: '保存'
  },
  closeFunc: Function as PropType<() => Promise<boolean>>,
  okFunc: Function as PropType<() => Promise<boolean>>
}

export const basicProps = Object.assign({}, modalProps, {
  canFullscreen: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  wrapperFooterOffset: {
    type: Number as PropType<number>,
    default: 0
  },
  helpMessage: [String, Array] as PropType<string | string[]>,
  useWrapper: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  showCancelBtn: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showOkBtn: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  wrapperProps: Object as PropType<any>,

  afterClose: Function as PropType<() => Promise<any>>,

  bodyStyle: Object as PropType<any>,

  closable: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  closeIcon: Object as PropType<any>,

  confirmLoading: Boolean as PropType<boolean>,

  destroyOnClose: Boolean as PropType<boolean>,

  footer: Object as PropType<any>,

  getContainer: Function as PropType<() => any>,

  mask: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  maskClosable: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  keyboard: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  maskStyle: Object as PropType<any>,

  okType: {
    type: String as PropType<string>,
    default: 'primary',
  },

  okButtonProps: Object as PropType<any>,

  cancelButtonProps: Object as PropType<any>,

  title: {
    type: String as PropType<string>,
  },

  visible: Boolean as PropType<boolean>,

  width: [String, Number] as PropType<string | number>,

  wrapClassName: {
    type: String as PropType<string>,
  },

  zIndex: {
    type: Number as PropType<number>,
  },
})