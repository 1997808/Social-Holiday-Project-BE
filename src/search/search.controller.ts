import { Controller, Get, Param } from '@nestjs/common';
import { UsersearchService } from './services/usersearch/usersearch.service';

@Controller('search')
export class SearchController {

    constructor(private userSearchService: UsersearchService) { }

    @Get(':query')
    async findAll(@Param() query) {
        return await this.userSearchService.userSearch(query);
    }
}
