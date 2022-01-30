import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './entities/user.interface';
import { User } from './entities/user.entity';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>
  ) {
    super(repository)
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const date = new Date().toISOString();
    let data = {
      ...createUserDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.repository.save(data);
  }
}
