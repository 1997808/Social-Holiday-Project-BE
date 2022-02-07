import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikepostsService } from './likeposts.service';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';

@Controller('likeposts')
export class LikepostsController {
  constructor(private readonly likepostsService: LikepostsService) { }

  @Post()
  create(@Body() createLikepostDto: CreateLikepostDto) {
    return this.likepostsService.create(createLikepostDto);
  }

  @Get()
  findAll() {
    return this.likepostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likepostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikepostDto: UpdateLikepostDto) {
    return this.likepostsService.update(+id, updateLikepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likepostsService.delete(+id);
  }
}
