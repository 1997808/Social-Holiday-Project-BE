import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IUser, IUserPaginate } from './entities/user.interface';
import { User } from './entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { UserQueryDto } from './dto/user.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const date = new Date().toISOString();
    const data = {
      ...createUserDto,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async findUserByName(query: UserQueryDto): Promise<IUserPaginate> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const [result, total] = await this.repository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { name: 'DESC' },
      take,
      skip,
    });

    return {
      data: result,
      count: total,
    };
  }
}
