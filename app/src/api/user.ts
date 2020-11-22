import { UserInfo } from '@/types/common'
import * as DB from '@/utils/localDb'

/**
 * 获取当前登录用户信息
 */
export async function getCurrentUserApi(): Promise<Nullable<UserInfo>> {
  const userId = await DB.login()
  return await DB.getUserInfo(userId)
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi(id: string): Promise<Nullable<UserInfo>> {
  return await DB.getUserInfo(id)
}


export async function updateUserInfoApi(id: string, info: Optional<UserInfo>) {
  const userInfo = await DB.getUserInfo(id)
  const newUserInfo = Object.assign({}, userInfo, info)
  const result = await DB.updateUser(id, newUserInfo)
  console.log('更新用户', result, newUserInfo)
  return result;
}
