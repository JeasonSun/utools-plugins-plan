
import { getCurrentUserApi, updateUserInfoApi } from '@/api/user'
import store from '@/store'
import { UserInfo } from '@/types/common'
import { hotModuleUnregisterModule } from '@/utils/helper/vuexHelper'

import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'

const NAME = 'user'
hotModuleUnregisterModule(NAME)


export interface UserState extends UserInfo {
  status: number;
  id: string;
  name: string;
  isNew: boolean;
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class User extends VuexModule {
  // state 
  name: UserState['name'] = ''
  id: UserState['id'] = ''
  isNew: UserState['isNew'] = false
  status: UserState['status'] = 0


  /**
   * 更新用户信息
   */
  @Mutation
  setUser(user: UserInfo): void {
    this.name = user.name;
    this.id = user.id;
    this.isNew = user.isNew
  }

  /**
   * 更新用户登录状态
   */
  @Mutation
  commitUserStatus(status: number): void {
    this.status = status
  }
  /**
 * 更新用户isNew
 */
  @Mutation
  commitUserIsNew(isNew: boolean): void {
    this.isNew = isNew
  }


  /**
   * 获取当前用户
   * 从本地中获取uid，然后获取用户信息
   * 如果没有uid，会自动创建用户
   */
  @Action
  async getUserInfo() {
    const user: Nullable<UserInfo> = await getCurrentUserApi()
    if (user) {
      this.setUser(user)
      this.commitUserStatus(1)
    }
  }

  @Action
  async storeAndUpdateIsNew(isNew: boolean) {
    console.log(this.id, '==========')
    await updateUserInfoApi(this.id, {
      isNew
    })
    this.commitUserIsNew(isNew)
  }

}

export { User }
export const userStore = getModule<User>(User)
