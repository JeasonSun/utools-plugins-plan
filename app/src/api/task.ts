import { AddTaskParam, Task } from '@/types/task'
import * as DB from '@/utils/localDb'
import { makeTask } from '@/utils/makeDefault'


/**
 * 获取清单列表
 */
export async function getTaskListApi(): Promise<Task[]> {
  return await DB.getTaskList()
}

export async function addTaskByListIdApi(params: AddTaskParam) {
  const { taskName, listId } = params;

  const newTask = makeTask(taskName, listId)
  return await DB.addTask(newTask, listId)
}