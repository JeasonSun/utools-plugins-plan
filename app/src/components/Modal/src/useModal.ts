import { getCurrentInstance, onUnmounted, reactive, ref, unref } from 'vue';
import { ModalMethods, ModalProps, ReturnMethods, UseModalReturnType } from './types';

const dataTransferRef = reactive<any>({})

export function useModal(): UseModalReturnType {
  if (!getCurrentInstance()) {
    throw new Error('Please put useModal function in the setup function!')
  }

  const modalRef = ref<Nullable<ModalMethods>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)
  const uidRef = ref<string>('')

  /**
   * 注册弹窗，往全局上挂载需要的方式
   * @param modalMethod 
   * @param uuid 
   */
  function register(modalMethod: ModalMethods, uuid: string) {
    uidRef.value = uuid
    console.log('register ....', uuid)

    onUnmounted(() => {
      modalRef.value = null
      loadedRef.value = false
      dataTransferRef[unref(uidRef)] = null
    })

    if (unref(loadedRef) && modalMethod === unref(modalRef)) return

    console.log('register success')

    modalRef.value = modalMethod
  }

  const getInstance = () => {
    const instance = unref(modalRef)
    if (!instance) {
      throw new Error('instance is undefined!')
    }
    return instance
  }

  /**
   * 暴露弹窗的方法，
   * 1. setModalProps:设置弹窗的属性
   * 2. openModal:打开弹窗
   * 3. transferModalData:更改弹窗，替换uid
   */
  const methods: ReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance().setModalProps(props);
    },

    openModal: (visible = true): void => {
      getInstance().setModalProps({
        visible: visible
      })
    },

    transferModalData(val: any) {
      dataTransferRef[unref(uidRef)] = val
    }
  }

  return [register, methods]

}