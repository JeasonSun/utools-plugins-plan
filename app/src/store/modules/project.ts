import { getProjectListApi } from '@/api/project'
import store from '@/store'
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

export enum ProjectType {
  List,
  Project
}

const defaultProject: ProjectInfo = {
  type: ProjectType.List,
  name: '默认项目',
  count: 0
}

export interface ProjectInfo {
  type: ProjectType;
  name: string;
  count: number;
  children?: ProjectInfo[];
}

export interface ProjectState {
  needDefaultList: boolean;
  list: ProjectInfo[];
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Project extends VuexModule {
  needDefaultList: ProjectState['needDefaultList'] = true
  list: ProjectState['list'] = []

  @Mutation
  commitList (list: ProjectInfo[]): void {
    this.list = [...list]
  }

  @Action
  async getListAction () {
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
}

export { Project }
export const projectStore = getModule<Project>(Project)
