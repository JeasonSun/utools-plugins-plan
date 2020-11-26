import { Task } from '@/types/task'
import * as DB from '@/utils/localDb'


/**
 * 获取清单列表
 */
export async function getTaskListApi(): Promise<Task[]> {
  return await DB.getTaskList()
}