import { UserInfo } from '@/types/common'
import { ProjectInfo } from '@/types/project'
import localForage from 'localforage'
import { isArray } from '../is'

import { makeUser } from '../makeDefault'

const localStore = localForage.createInstance({
  name: 'plan',
  storeName: 'plan'
})

export async function getProjectList(): Promise<ProjectInfo[]> {
  let list: ProjectInfo[] | null = await localStore.getItem('projectList')
  list = isArray(list) ? list : []
  return list
}

export async function addProject(newDir: ProjectInfo): Promise<ProjectInfo[]> {
  let list: ProjectInfo[] | null = await localStore.getItem('projectList')
  list = isArray(list) ? list : []
  const newList = [newDir, ...list];
  await localStore.setItem('projectList', newList)
  return newList
}

/**
 * 获取用户信息
 * @param id 
 */
export async function getUserInfo(id: string): Promise<UserInfo> {
  let user: Nullable<UserInfo> = await localStore.getItem('user')
  if (!user || user.id !== id) {
    // 创建一个新用户，并且存储一下
    user = makeUser()
    await localStore.setItem('user', user)
  }
  return user
}

/**
 * 获取当前用户ID
 * @param id 
 */
export async function getUserId(): Promise<string> {
  let userId: Nullable<string> = await localStore.getItem('user_id')
  if (!userId) {
    // 如果不存在UserId，并且需要自动创建
    const user = makeUser()
    userId = user.id
    await localStore.setItem('user', user)
  }
  return userId
}



export default localStore
