
export interface Task {
  parent: string;
  id: string;
  name: string;
  status: TaskCompleteType;
  complete?: number; // 完成度
}

export interface GetTasksByIdParam {
  listId: string;
  status: TaskCompleteType;
}

export interface AddTaskParam {
  listId: string;
  taskName: string;
}