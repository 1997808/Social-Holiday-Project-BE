import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LikepostsService } from './likeposts.service';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('likeposts')
export class LikepostsController {
  constructor(private readonly likepostsService: LikepostsService) {}

  @Post()
  create(@Body() createLikepostDto: CreateLikepostDto, @Request() req) {
    return this.likepostsService.create(req.user, createLikepostDto);
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
  update(
    @Param('id') id: string,
    @Body() updateLikepostDto: UpdateLikepostDto,
  ) {
    return this.likepostsService.update(+id, updateLikepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likepostsService.delete(+id);
  }
}
