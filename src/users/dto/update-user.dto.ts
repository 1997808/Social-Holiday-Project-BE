import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.class';

export class UpdateUserDto extends PartialType(User) { }
