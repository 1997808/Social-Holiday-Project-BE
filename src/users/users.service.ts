import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const date = new Date().toISOString();
    let data = {
      ...createUserDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.userRepository.save(data);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ userid: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ userid: id }, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete({ userid: id });
  }
}
