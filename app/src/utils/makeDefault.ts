import { ProjectTypeEnum } from "@/enums/projectTypeEnum";
import { UserInfo } from '@/types/common';
import { ProjectInfo } from '@/types/project';
import { buildUUID } from '@/utils/uuid';


export function makeDir(name: string): ProjectInfo {
  const id = 'p_' + buildUUID();
  return {
    type: ProjectTypeEnum.PROJECT,
    name,
    count: 0,
    id
  }
}

export function makeUser(): UserInfo{
  const uid = buildUUID()
  const user = {
    id: `user_${uid}`,
    name: `用户名${uid}`,
    init: true
  }
  return user;
}