import { getProjectListApi, addProjectListApi, updateStoreListApi } from '@/api/project'
import { defaultProject, NO_DIR_ID } from '@/constant/default'
import store from '@/store'
import { AddListParam, ProjectInfo } from '@/types/project'
import { hotModuleUnregisterModule } from '@/utils/helper/vuexHelper'
import { isArray } from '@/utils/is'
import { userStore } from '@/store/modules/user';
import { useMessage } from '@/hooks/web/useMessage'

import {
  Action,
  getModule,
  Module,
  Mutation,
  MutationAction,
  VuexModule
} from 'vuex-module-decorators'
import { makeList } from '@/utils/makeDefault'

const NAME = 'project'
hotModuleUnregisterModule(NAME)

const { toast } = useMessage()

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

  // 直接更新localStore中的list，
  // 并且更新 state
  @MutationAction({ mutate: ['list'] })
  async commitAndStoreList(list: ProjectInfo[]) {
    await updateStoreListApi(list)
    return {
      list: [...list]
    }
  }

  /**
   * 获取左侧清单列表
   */
  @Action
  async getListAction() {
    const isNew = userStore.isNew
    let list = await getProjectListApi()

    list = isArray(list) ? list : []
    let result
    if (isNew) {
      result = [defaultProject, ...list]
    } else {
      result = [...list]
    }
    // this.commitList(result)
    this.commitAndStoreList(result)
    // 更新用户信息，isNew = false
    userStore.storeAndUpdateIsNew(false)
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

  /**
   * 创建一个新的文件夹
   * @param name 文件夹的名称
   */
  @Action
  async addDirAction(name: string) {
    const newList = await addProjectListApi(name);
    this.commitList(newList)
  }

  @Action
  async addListByDirId(param: AddListParam) {
    
    const { listName, dirId } = param;
    console.log('更新lIST', listName, dirId)
    let updated = false;
    let dirList;
    const newList = makeList(listName)

    if (dirId === NO_DIR_ID) {
      updated = true;
      dirList = [newList, ...this.list]
    } else {
      dirList = this.list.map(item => {
        if (item.id === dirId) {
          updated = true;
          const child = item.children || []

          item.children = [newList, ...child]
        }
        return item
      })
    }


    if (updated) {
      console.log('需要更新list', dirList)
      // this.commitList([...dirList])
      //TODO: 这里有问题
      this.commitAndStoreList([...dirList])
    }
  }


}

export { Project }
export const projectStore = getModule<Project>(Project)
