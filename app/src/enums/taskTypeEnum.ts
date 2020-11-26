// 任务状态
export enum TaskCompleteState {
  ALL = 'ALL', // 
  TODO = 'TODO',
  DONE = 'DONE',
}

export type TaskCompleteType = keyof Record<TaskCompleteState, string>