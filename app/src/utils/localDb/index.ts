import { ProjectInfo } from '@/store/modules/project'
import localForage from 'localforage'
import { isArray } from '../is'

const localStore = localForage.createInstance({
  name: 'plan',
  storeName: 'plan'
})

export async function getProjectList (): Promise<ProjectInfo[]> {
  let list: ProjectInfo[] | null = await localStore.getItem('projectList')
  list = isArray(list) ? list : []
  return list
}

export default localStore
