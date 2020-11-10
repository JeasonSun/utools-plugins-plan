import { ButtonProps } from 'ant-design-vue/types/button/button'
import { CSSProperties, VNodeChild } from 'vue'

export interface ModalProps {
  // 启用wrapper后， 底部可以适当增加高度
  wrapperFooterOffset?: number;
  draggable?: boolean;

  // 是否可以进行全屏
  canFullscreen?: boolean;
  visible?: boolean;

  // 温馨提示信息
  helpMessage: string | string[];

  // 是否使用modalWrapper
  useWrapper: boolean;

  loading: boolean;

  wrapperProps: Omit<ModalWrapperProps, 'loading'>

  showOkBtn: boolean;
  showCancelBtn: boolean;

  closeFunc: () => Promise<any>;

  afterClose?: () => any;

  bodyStyle?: CSSProperties;

  cancelText?: string;

  centered?: boolean;

  closable?: boolean;

  closeIcon?: boolean;

  confirmLoading?: boolean;

  destroyOnClose?: boolean;

  footer?: VNodeChild | JSX.Element;

  getContainer?: (instance: any) => HTMLElement;

  mask?: boolean;

  maskClosable?: boolean;

  maskStyle?: CSSProperties;

  okText?: string;

  okType?: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default';

  okButtonProps?: ButtonProps;

  cancelButtonProps?: ButtonProps;

  title?: VNodeChild | JSX.Element;

  width?: string | number;

  wrapClassName?: string;

  zIndex?: number;

}

export interface ModalWrapperProps {
  footerOffset?: number;
  loading: boolean;
  modalHeaderHeight: number;
  modalFooterHeight: number;
  minHeight: number;
  visible: boolean;
  fullScreen: boolean;
}

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void
}

export interface ReturnMethods extends ModalMethods {
  openModal: (props?: boolean) => void;
  transferModalData: (data: any) => void;
}



export type RegisterFn = (modalMethods: ModalMethods, uuid: string) => void


export type UseModalReturnType = [RegisterFn, ReturnMethods]