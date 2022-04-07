import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikecommentsService } from './likecomments.service';
import { CreateLikecommentDto } from './dto/create-likecomment.dto';
import { UpdateLikecommentDto } from './dto/update-likecomment.dto';

@Controller('likecomments')
export class LikecommentsController {
  constructor(private readonly likecommentsService: LikecommentsService) {}

  @Post()
  create(@Body() createLikecommentDto: CreateLikecommentDto) {
    return this.likecommentsService.create(createLikecommentDto);
  }

  @Get()
  findAll() {
    return this.likecommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likecommentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLikecommentDto: UpdateLikecommentDto,
  ) {
    return this.likecommentsService.update(+id, updateLikecommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likecommentsService.delete(+id);
  }
}
