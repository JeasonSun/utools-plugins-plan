import store from '@/store'
import { hotModuleUnregisterModule } from '@/utils/helper/vuexHelper'

import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { AddTaskParam, GetTasksByIdParam, Task } from '@/types/task'
import { addTaskByListIdApi, getTaskListApi } from '@/api/task'
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
  commitAddTask(param: AddTaskParam): void {

    const { taskName, listId } = param
    console.log(taskName, listId)
    const newTask = makeTask(taskName, listId)
    const newList = [newTask, ...this.list]
    this.list = [...newList]
  }

  @Action
  async addTaskByListIdAction(params: AddTaskParam){
    const newTask = await addTaskByListIdApi(params)
  }

  @Action
  async getTasksByListIdAction(params: GetTasksByIdParam) {
    console.log('获取清单任务', params)
    const tasks = await getTaskListApi()
    this.commitTaskList(tasks)
  }

}

export { Tasks }
export const tasksStore = getModule<Tasks>(Tasks)
