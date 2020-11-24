import { ROOT_LEVEL } from '@/constant/default';
import { ProjectTypeEnum } from "@/enums/projectTypeEnum";
import { UserInfo } from '@/types/common';
import { ProjectInfo } from '@/types/project';
import { snowUuid } from '@/utils/uuid';

/**
 * 创建一个新文件夹
 * @param name 
 */
export function makeDir(name: string, parent: string = ROOT_LEVEL): ProjectInfo {
  const id = snowUuid('p');
  return {
    type: ProjectTypeEnum.PROJECT,
    name,
    count: 0,
    id,
    parent,
    open: true
  }
}

/**
 * 创建一个用户
 */
export function makeUser(): UserInfo {
  const uid = snowUuid('u')
  const user = {
    id: uid,
    name: `用户名_${uid}`,
    isNew: true
  }
  return user;
}

export function makeList(name: string, parent: string = ROOT_LEVEL): ProjectInfo {
  const id = snowUuid('l');
  return {
    type: ProjectTypeEnum.LIST,
    name,
    count: 0,
    id,
    parent
  }
}