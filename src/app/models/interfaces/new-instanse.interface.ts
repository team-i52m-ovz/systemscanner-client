export interface INewInstance {
  pid: string;
  token?: string;
  name: string;
  users?: IUser[];
  assignees?: IUser[];
}

export interface INewInstancePatch {
  pid: string;
  token?: string;
  name: string;
  users?: number[];
}

export interface IUser {
  firstName?: string;
  id: number;
  lastName?: string;
}
