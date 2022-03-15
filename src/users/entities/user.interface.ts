export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
  profilePictureUrl: string;
}

export interface IUserPaginate {
  data: IUser[];
  count: number;
}
