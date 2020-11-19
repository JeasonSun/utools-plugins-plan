import { ProjectInfo } from '@/types/project'
import * as DB from '@/utils/localDb'
import { makeDir } from '@/utils/makeDefault'

enum API {
  ProjectList = '/getProjectList'
}

/**
 * 获取清单列表
 */
export async function getProjectListApi(): Promise<ProjectInfo[]> {
  return await DB.getProjectList()
}

/**
 * 获取清单列表
 */
export async function addProjectListApi(name: string): Promise<ProjectInfo[]> {
  const newDir = makeDir(name)
  return await DB.addProject(newDir)
}
