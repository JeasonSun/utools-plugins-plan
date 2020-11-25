export interface ProjectInfo {
  type: ProjectTypeEnum.PROJECT | ProjectTypeEnum.LIST;
  name: string;
  count: number;
  id: string;
  open?: boolean;
  icon?: string;
  parent?: string;
  children?: ProjectInfo[];
}

export interface AddListParam {
  listName: string;
  dirId: string;
}

export interface ChangeOpenStateParam {
  dirId: string;
  openState: boolean;
}

export interface DeleteListParam {
  listId: string;
  dirId: string;
}

export interface ActiveListParam {
  listId: string;
  listName: string;
}