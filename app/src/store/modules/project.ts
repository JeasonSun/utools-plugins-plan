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
  id: 'p_0',
  children: [
    {
      type: ProjectTypeEnum.LIST,
      name: '重要且紧急',
      count: 0,
      id: 'p_0_1',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '重要不紧急',
      count: 0,
      id: 'p_0_2',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '不重要但紧急',
      count: 0,
      id: 'p_0_3',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '不重要且不紧急',
      count: 0,
      id: 'p_0_4',
    }
  ]
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

  
}

export { Project }
export const projectStore = getModule<Project>(Project)
