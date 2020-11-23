export interface ProjectInfo {
  type: ProjectTypeEnum.PROJECT | ProjectTypeEnum.LIST;
  name: string;
  count: number;
  id: string;
  children?: ProjectInfo[];
}

export interface AddListParam{
  listName: string;
  dirId: string;
}