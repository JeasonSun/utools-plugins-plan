import { ProjectTypeEnum } from "@/enums/projectTypeEnum";
import { UserInfo } from '@/types/common';
import { ProjectInfo } from '@/types/project';
import { buildUUID,snowUuid } from '@/utils/uuid';


export function makeDir(name: string): ProjectInfo {
  const id = snowUuid('p');
  return {
    type: ProjectTypeEnum.PROJECT,
    name,
    count: 0,
    id
  }
}

export function makeUser(): UserInfo{
  const uid = snowUuid('u')
  const user = {
    id: uid,
    name: `用户名_${uid}`,
    isNew: true
  }
  return user;
}