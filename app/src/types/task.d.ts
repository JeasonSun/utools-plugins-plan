import { TaskCompleteType } from "@/enums/taskTypeEnum";

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

export interface ChangeTaskStatusParam{
  listId: string;
  taskId: string;
  status: TaskCompleteType;
}