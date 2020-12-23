import { AddTaskParam, ChangeTaskStatusParam, GetTasksByIdParam, Task } from '@/types/task'
import * as Service from '@/service/localDb'
import { makeTask } from '@/utils/makeDefault'


/**
 * 获取清单列表
 */
export async function getTaskListApi(params: GetTasksByIdParam): Promise<Task[]> {

  return await Service.getTasksByList(params)
}

export async function addTaskByListIdApi(params: AddTaskParam) {
  const { taskName, listId } = params;

  const newTask = makeTask(taskName, listId)
  return await Service.addTask(newTask, listId)
}

export async function updateTaskApi(params: ChangeTaskStatusParam): Promise<Nullable<Task>> {
  return await Service.updateTask(params)
}