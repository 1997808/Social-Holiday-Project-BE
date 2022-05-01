export class UserDto {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly profile: string;
  readonly profilePictureUrl: string;
}

export class UserQueryDto {
  readonly take?: number;
  readonly page?: number;
  readonly keyword: string;
}
