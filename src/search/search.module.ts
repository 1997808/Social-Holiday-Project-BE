import { Module } from '@nestjs/common';

import { SearchController } from './controllers/search.controller';
import { UsersearchService } from './services/usersearch/usersearch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SearchController],
  providers: [UsersearchService]
})
export class SearchModule { }
