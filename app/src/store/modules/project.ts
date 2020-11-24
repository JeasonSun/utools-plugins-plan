import { getProjectListApi, addProjectListApi } from '@/api/project'
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
  VuexModule
} from 'vuex-module-decorators'
import { makeList } from '@/utils/makeDefault'

const NAME = 'project'
hotModuleUnregisterModule(NAME)

const { toast } = useMessage()

export interface ProjectState {
  list: ProjectInfo[];
  activeId: Nullable<string>;
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Project extends VuexModule {

  list: ProjectState['list'] = []
  activeId: ProjectState['activeId'] = null

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

  /**
   * 在某个文件夹下添加清单
   * @param param.listName 清单名称
   * @param param.dirId 文件夹ID
   */
  @Mutation
  addListByDirId(param: AddListParam) {

    const { listName, dirId } = param;
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
      this.list = [...dirList]
    }
  }

  /**
   * 切换文件夹的展开状态
   * @param param.dirId 文件夹ID
   * @param param.openState 文件夹展开状态
   */
  @Mutation
  changeDirOpenStateAction(param: ChangeOpenStateParam) {
    const { dirId, openState } = param;
    const newList = this.list.map(item => {
      if (item.id === dirId) {
        item.open = openState
      }
      return item
    })
    this.list = [...newList]
  }

  // 删除清单
  @Mutation
  deleteListByIdAction(param: DeleteListParam) {
    const { listId, dirId } = param;
    let newList;
    if (dirId === ROOT_LEVEL) {
      newList = this.list.filter(item => item.id !== listId)
    } else {
      newList = this.list.map(item => {
        if (item.id === dirId) {
          const child = item.children || []
          const filterChild = child.filter(childItem => childItem.id !== listId)
          item.children = [...filterChild]
        }
        return item
      })
    }
    this.list = [...newList]
  }

  /**
   * 解散文件夹
   * @param dirId 
   */
  @Mutation
  flattenListAction(dirId: string) {
    let newList: ProjectInfo[] = []
    this.list.forEach(item => {
      if (dirId === item.id) {
        if (item.children && item.children.length) {
          const child = item.children.map(childItem => {
            childItem.parent = item.parent
            return childItem
          })
          newList = newList.concat(child)
        }
      } else {
        newList = newList.concat(item)
      }
    })
    this.list = [...newList]
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
    this.commitList(result)
    userStore.storeAndUpdateIsNew(false)
  }

  /**
   * 创建一个新的文件夹
   * @param name 文件夹的名称
   */
  @Action
  async addDirAction(name: string) {
    const newList = await addProjectListApi(name);
    // this.commitAndStoreList(newList)
    this.commitList(newList)
  }

}

export { Project }
export const projectStore = getModule<Project>(Project)
