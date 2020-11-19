import { getProjectListApi ,addProjectListApi} from '@/api/project'
import { defaultProject } from '@/constant/default'
import store from '@/store'
import { ProjectInfo } from '@/types/project'
import { hotModuleUnregisterModule } from '@/utils/helper/vuexHelper'
import { isArray } from '@/utils/is'

import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'

const NAME = 'project'
hotModuleUnregisterModule(NAME)


export interface ProjectState {
  needDefaultList: boolean;
  list: ProjectInfo[];
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Project extends VuexModule {
  // state 
  needDefaultList: ProjectState['needDefaultList'] = true
  list: ProjectState['list'] = []

  // getter
  // get subList(): ProjectState['list'] {
  //   const list = this.list.filter(item => item.id === id) || []
  //   const result = list[0].children || []
  //   return result
  // }


  @Mutation
  commitList(list: ProjectInfo[]): void {
    this.list = [...list]
  }

  /**
   * 获取左侧清单列表
   */
  @Action
  async getListAction() {
    let list = await getProjectListApi()
    
    list = isArray(list) ? list : []
    let result
    if (this.needDefaultList) {
      result = [defaultProject, ...list]
    } else {
      result = [...list]
    }
    this.commitList(result)
  }

  /**
   * 根据ID获取子清单列表
   * @param id 
   */
  @Action
  async getListByDirIdAction(id: string): Promise<ProjectInfo[]> {
    const list = this.list.filter(item => item.id === id) || []
    const result = list[0].children || []
    return result
  }

  @Action
  async addDirAction(name: string) {
    const newList = await addProjectListApi(name);
    this.commitList(newList)
  }

  
}

export { Project }
export const projectStore = getModule<Project>(Project)
