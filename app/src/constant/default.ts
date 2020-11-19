import { ProjectTypeEnum } from '@/enums/projectTypeEnum';
import { ExtraInfo } from '@/types/common';
import { ProjectInfo } from "@/types/project";

export const defaultProject: ProjectInfo = {
  type: ProjectTypeEnum.PROJECT,
  name: '默认项目',
  count: 0,
  id: 'p_0',
  children: [
    {
      type: ProjectTypeEnum.LIST,
      name: '重要且紧急',
      count: 0,
      id: 'p_0_1',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '重要不紧急',
      count: 0,
      id: 'p_0_2',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '不重要但紧急',
      count: 0,
      id: 'p_0_3',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '不重要且不紧急',
      count: 0,
      id: 'p_0_4',
    }
  ]
}


export const defaultExtraInfo: ExtraInfo = {
  new: false
}