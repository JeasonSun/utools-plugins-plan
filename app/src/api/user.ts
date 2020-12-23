import { UserInfo } from '@/types/common'
import * as Service from '@/service/localDb'

/**
 * 获取当前登录用户信息
 */
export async function getCurrentUserApi(): Promise<Nullable<UserInfo>> {
  const userId = await Service.login()
  return await Service.getUserInfo(userId)
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi(id: string): Promise<Nullable<UserInfo>> {
  return await Service.getUserInfo(id)
}


export async function updateUserInfoApi(id: string, info: Optional<UserInfo>) {
  const userInfo = await Service.getUserInfo(id)
  const newUserInfo = Object.assign({}, userInfo, info)
  const result = await Service.updateUser(id, newUserInfo)
  console.log('更新用户', result, newUserInfo)
  return result;
}
