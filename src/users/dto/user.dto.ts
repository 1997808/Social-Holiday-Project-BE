export class UserDto {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly profile: string;
  // readonly createdAt: Date;
  // readonly updatedAt: Date;
  readonly profilePictureUrl: string;
}

export class UserQueryDto {
  readonly take?: number;
  readonly page?: number;
  readonly keyword: string;
}
