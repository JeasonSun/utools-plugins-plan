import { getProjectListApi, addProjectListApi, updateStoreListApi } from '@/api/project'
import { defaultProject, ROOT_LEVEL } from '@/constant/default'
import store from '@/store'
import { AddListParam, ChangeOpenStateParam, DeleteListParam, ProjectInfo } from '@/types/project'
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
import { toRawObj } from '@/utils'

const NAME = 'project'
hotModuleUnregisterModule(NAME)

const { toast } = useMessage()

export interface ProjectState {
  list: ProjectInfo[];
  activeId: Nullable<string>;
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Project extends VuexModule {
  // state 
  list: ProjectState['list'] = []
  activeId: ProjectState['activeId'] = null


  // getter
  // get subList(): ProjectState['list'] {
  //   const list = this.list.filter(item => item.id === id) || []
  //   const result = list[0].children || []
  //   return result
  // }

  @Mutation
  commitActiveList(listId: string): void {
    this.activeId = listId;
  }

  /**
   * 去除此方法， 需要在每次提交的state的时候存储一次
   * 使用： commitAndStoreList
   * @param list 
   */
  @Mutation
  commitList(list: ProjectInfo[]): void {
    this.list = [...list]
  }

  // 直接更新localStore中的list，
  // 并且更新 state
  @MutationAction({ mutate: ['list'] })
  async commitAndStoreList(list: ProjectInfo[]) {
    const ListRaw = toRawObj(list);
    await updateStoreListApi(ListRaw)
    return {
      list: [...ListRaw]
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
    this.commitAndStoreList(newList)
  }

  @Action
  async addListByDirId(param: AddListParam) {

    const { listName, dirId } = param;
    console.log('更新lIST', listName, dirId)
    let updated = false;
    let dirList;
    const newList = makeList(listName, dirId)

    if (dirId === ROOT_LEVEL) {
      updated = true;
      dirList = [newList, ...this.list]
    } else {
      dirList = this.list.map(item => {
        if (item.id === dirId) {
          updated = true;
          const child = item.children || []

          item.children = [newList, ...child]
          item.open = true
        }
        return item
      })
    }


    if (updated) {
      console.log('需要更新list', dirList)
      // this.commitList([...dirList])
      this.commitAndStoreList([...dirList])
    }
  }

  @Action
  async changeDirOpenStateAction(param: ChangeOpenStateParam) {
    const { dirId, openState } = param;
    const newList = this.list.map(item => {
      if (item.id === dirId) {
        item.open = openState
      }
      return item
    })
    this.commitAndStoreList([...newList])
  }

  // 删除清单
  @Action
  async deleteListByIdAction(param: DeleteListParam) {
    const { listId, dirId } = param;

  }


}

export { Project }
export const projectStore = getModule<Project>(Project)
