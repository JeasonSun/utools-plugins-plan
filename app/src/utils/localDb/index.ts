import { UserInfo } from '@/types/common'
import { ProjectInfo } from '@/types/project'
import localForage from 'localforage'
import { isArray } from '../is'
import { makeUser } from '../makeDefault'
import { useMessage } from '@/hooks/web/useMessage'
import { ChangeTaskStatusParam, GetTasksByIdParam, Task } from '@/types/task'
import { TaskCompleteState } from '@/enums/taskTypeEnum'

const { toast } = useMessage()

const localStore = localForage.createInstance({
  name: 'plan',
  storeName: 'plan'
})

let localList: LocalForage;

export async function getProjectList(): Promise<ProjectInfo[]> {
  if (!localList) {
    toast.error('登录失效，请重新登录')
    return []
  }
  let list: ProjectInfo[] | null = await localList.getItem('projectList')
  list = isArray(list) ? list : []
  return list
}

export async function addProject(newDir: ProjectInfo): Promise<ProjectInfo[]> {
  let list: ProjectInfo[] | null = await localList.getItem('projectList')
  list = isArray(list) ? list : []
  const newList = [newDir, ...list];
  await localList.setItem('projectList', newList)
  return newList
}

export async function updateStoreList(list: ProjectInfo[]): Promise<boolean> {
  if (list && isArray(list)) {
    await localList.setItem('projectList', list)
    return true
  }
  return false
}

/**
 * 获取用户信息
 * @param id 
 */
export async function getUserInfo(id: string): Promise<Nullable<UserInfo>> {
  const user: Nullable<UserInfo> = await localStore.getItem('user')
  console.log('获取用户信息', id, 'local', user?.id)
  if (!user || user.id !== id) {
    // // 创建一个新用户，并且存储一下
    // user = makeUser()
    // await localStore.setItem('user', user)
    console.log('用户不存在')
    toast.error('用户不存在')
  }
  return user
}

/**
 * 获取当前用户ID
 * @param id 
 */
export async function login(): Promise<string> {
  let userId: Nullable<string> = await localStore.getItem('user_id')
  if (!userId) {
    console.log('不存在用户，自动创建并且登录')
    // 如果不存在UserId，并且需要自动创建
    const user = makeUser()
    userId = user.id
    await localStore.setItem('user_id', userId)
    await localStore.setItem('user', user)
  }
  // 根据用户ID创建相关数据库
  localList = localForage.createInstance({
    name: `plan_${userId}`,
    storeName: `plan_${userId}`
  })
  console.log('登录成功', userId)
  return userId
}

export async function updateUser(id: string, info: UserInfo) {
  const localId = await localStore.getItem('user_id')
  const localUser: Nullable<UserInfo> = await localStore.getItem('user')
  if (localId === id && id === localUser?.id) {
    await localStore.setItem('user', info)
  }
  return true
}

/**
 * --------------------  task ----------------------
 */
export async function addTask(task: Task, listId: string) {
  const listStore = await localForage.createInstance({
    name: `plan_task`,
    storeName: `list_${listId}`
  })
  const result = await listStore.setItem(task.id, task)
  return result
}

export async function getTasksByList(params: GetTasksByIdParam): Promise<Task[]> {
  const { listId, status } = params
  const listStore = await localForage.createInstance({
    name: `plan_task`,
    storeName: `list_${listId}`
  })
  const result: Task[] = []
  await listStore.iterate((value: Task, key: string) => {
    const { status: itemStatus } = value;
    if (status === TaskCompleteState.ALL) {
      result.unshift(value)
    } else {
      status === itemStatus && result.unshift(value)
    }
  })
  return result
}

export async function updateTask(params: ChangeTaskStatusParam): Promise<Nullable<Task>> {
  const { listId, taskId, status } = params;
  console.log(listId, taskId, status)
  const listStore = await localForage.createInstance({
    name: `plan_task`,
    storeName: `list_${listId}`
  })
  const task: Nullable<Task> = await listStore.getItem(taskId)
  if (task) {
    // TODO: 这里先粗略的更改complete
    const newTask = Object.assign({}, task, { status, complete: status === TaskCompleteState.DONE ? 100 : 0 })
    await listStore.setItem(taskId, newTask)
    return newTask
  } else {
    return null
  }

}


export default localStore
