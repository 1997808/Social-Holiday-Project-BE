import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IUser, IUserPaginate } from './entities/user.interface';
import { User } from './entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { UserQueryDto } from './dto/user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private cloudinary: CloudinaryService,
  ) {
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

  async findUserWithPassword(email: string): Promise<any> {
    return await this.repository.findOne(
      { email },
      {
        select: ['id', 'name', 'username', 'email', 'password'],
      },
    );
  }

  async findUserByName(query: UserQueryDto): Promise<IUserPaginate> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const [result, total] = await this.repository.findAndCount({
      where: { username: Like('%' + keyword + '%') },
      order: { name: 'ASC' },
      take,
      skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findUserProfileById(id: number): Promise<any> {
    // return await this.repository.findOne({ id }, { relations: ['posts'] });
    return await this.repository
      .createQueryBuilder('users')
      .where(`users.id = ${id}`)
      .leftJoinAndSelect('users.posts', 'posts', '')
      .orderBy({
        'posts.createdAt': 'DESC',
      })
      .getOne();
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
