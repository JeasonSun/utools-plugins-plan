


export type RegisterFn = (modalMethods: ModalMethods, uuid?:string) => void


export type UseModalReturnType = [RegisterFn, ReturnMethods]