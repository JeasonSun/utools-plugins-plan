import { getProjectListApi } from '@/api/project'
import { ProjectTypeEnum } from '@/enums/projectTypeEnum'
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



const defaultProject: ProjectInfo = {
  type: ProjectTypeEnum.PROJECT,
  name: '默认项目',
  count: 0,
  id: 'p-0'
}

export interface ProjectInfo {
  type: ProjectTypeEnum.PROJECT | ProjectTypeEnum.LIST;
  name: string;
  count: number;
  id: string;
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
  commitList(list: ProjectInfo[]): void {
    this.list = [...list]
  }

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
}

export { Project }
export const projectStore = getModule<Project>(Project)
