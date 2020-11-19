import { UserInfo } from '@/types/common'
import * as DB from '@/utils/localDb'

/**
 * 获取当前登录用户信息
 */
export async function getCurrentUserApi(): Promise<UserInfo> {
  const userId = await DB.getUserId()
  return await DB.getUserInfo(userId)
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi(id: string): Promise<UserInfo> {
  return await DB.getUserInfo(id)
}


export async function updateUserInfo(id: string, info: UserInfo) {
  return false;
}
