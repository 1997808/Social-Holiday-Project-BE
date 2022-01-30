import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersearchService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async userSearch(query: string): Promise<User[]> {
        return await this.userRepository
            .createQueryBuilder("user")
            .where("user.name like :name", { name: `%${query}%` })
            .getMany();
    }
}
