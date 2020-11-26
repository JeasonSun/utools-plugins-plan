import store from '@/store'
import { hotModuleUnregisterModule } from '@/utils/helper/vuexHelper'

import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { GetTasksByIdParam, Task } from '@/types/task'

const NAME = 'task'
hotModuleUnregisterModule(NAME)


export interface TaskState {
  list: Task[];
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Tasks extends VuexModule {

  list: TaskState['list'] = []

  @Action
  async getTasksByListIdAction(params: GetTasksByIdParam){
    console.log(params)
  }

}

export { Tasks }
export const tasksStore = getModule<Tasks>(Tasks)
