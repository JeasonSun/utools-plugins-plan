import { ProjectInfo } from '@/store/modules/project'
import * as DB from '@/utils/localDb'

enum API {
  ProjectList = '/getProjectList'
}

/**
 * 获取清单列表
 */
export async function getProjectListApi (): Promise<ProjectInfo[]> {
  return await DB.getProjectList()
}
