import store from '@/store'
import { hotModuleUnregisterModule } from '@/utils/helper/vuexHelper'

import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { AddTaskParam, ChangeTaskStatusParam, GetTasksByIdParam, Task } from '@/types/task'
import { addTaskByListIdApi, getTaskListApi, updateTaskApi } from '@/api/task'
import { makeTask } from '@/utils/makeDefault'

const NAME = 'task'
hotModuleUnregisterModule(NAME)


export interface TaskState {
  list: Task[];
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Tasks extends VuexModule {

  list: TaskState['list'] = []


  @Mutation
  commitTaskList(list: Task[]): void {
    this.list = list
  }

  @Mutation
  commitAddTask(newTask: Task): void {
    const newList = [newTask, ...this.list]
    this.list = [...newList]
  }

  @Mutation
  commitUpdateTask(task: Task): void {
    const newList = this.list.map(item => {
      if (item.id === task.id) {
        return task
      }
      return item
    })
    this.list = [...newList]
  }

  @Action
  async addTaskByListIdAction(params: AddTaskParam) {
    const newTask = await addTaskByListIdApi(params)
    console.log('已经存储在local中了', newTask)
    this.commitAddTask(newTask)
  }

  @Action
  async getTasksByListIdAction(params: GetTasksByIdParam) {
    console.log('获取清单任务', params)
    const tasks = await getTaskListApi(params)
    this.commitTaskList(tasks)
  }

  @Action
  async changeTaskStatusAction(params: ChangeTaskStatusParam) {
    const task: Nullable<Task> = await updateTaskApi(params)
    if (task) {
      this.commitUpdateTask(task)
    }

  }

}

export { Tasks }
export const tasksStore = getModule<Tasks>(Tasks)
