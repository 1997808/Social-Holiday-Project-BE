import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchDto } from '../dto/search.dto';
import { UsersearchService } from '../services/usersearch/usersearch.service';

@Controller('search')
export class SearchController {

    constructor(private userSearchService: UsersearchService) { }

    @Post()
    async findAll(@Body() SearchDto: SearchDto) {
        return await this.userSearchService.userSearch(SearchDto.name);
    }

}
