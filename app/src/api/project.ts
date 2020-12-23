import { ProjectInfo } from '@/types/project'
import * as Service from '@/service/localDb'
import { makeDir } from '@/utils/makeDefault'

/**
 * 获取清单列表
 */
export async function getProjectListApi(): Promise<ProjectInfo[]> {
  return await Service.getProjectList()
}

/**
 * 获取清单列表
 */
export async function addProjectListApi(name: string): Promise<ProjectInfo[]> {
  const newDir = makeDir(name)
  return await Service.addProject(newDir)
}

export async function updateStoreListApi(list: ProjectInfo[]): Promise<boolean> {
  console.log('DB中更新存储', list)
  return await Service.updateStoreList(list)
}
