import { ProjectTypeEnum } from '@/enums/projectTypeEnum';
import { ProjectInfo } from "@/types/project";

export const defaultProject: ProjectInfo = {
  type: ProjectTypeEnum.PROJECT,
  name: '默认项目',
  count: 0,
  id: 'p_0',
  open: true,
  children: [
    {
      type: ProjectTypeEnum.LIST,
      name: '重要且紧急',
      count: 0,
      id: 'l_0_1',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '重要不紧急',
      count: 0,
      id: 'l_0_2',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '不重要但紧急',
      count: 0,
      id: 'l_0_3',
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '不重要且不紧急',
      count: 0,
      id: 'l_0_4',
    }
  ]
}

// TODO: 工具栏清单应该可以配置，暂时写死
export const defaultToolList: ProjectInfo = {
  type: ProjectTypeEnum.PROJECT,
  name: '工具栏清单',
  count: 0,
  id: 'tp_0',
  open: true,
  children: [
    {
      type: ProjectTypeEnum.LIST,
      name: '待归类',
      count: 0,
      id: 'tl_0_1',
      icon: 'box'
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '今天',
      count: 0,
      id: 'tl_0_2',
      icon: 'daiban'
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '已完成',
      count: 0,
      id: 'tl_0_3',
      icon: 'done'
    },
    {
      type: ProjectTypeEnum.LIST,
      name: '标星',
      count: 0,
      id: 'tl_0_4',
      icon: 'star'
    }
  ]
}

export const NO_DIR_ID = 'no_dir';
