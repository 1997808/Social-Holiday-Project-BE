import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post()
  create(@Body() createFriendshipDto: CreateFriendshipDto, @Request() req) {
    if (createFriendshipDto.receiver === req.user.id) {
      return { message: 'Unable to send to yourself' };
    }
    if (
      this.friendshipsService.checkExistedFriendRequest(
        createFriendshipDto.receiver,
        req.user.id,
      )
    ) {
      return { message: 'Request already existed' };
    }
    return this.friendshipsService.create(req.user, createFriendshipDto);
  }

  @Get('/all')
  findAll() {
    return this.friendshipsService.findAll();
  }

  @Get('/pending')
  findPendingFriendRequest(@Request() req) {
    return this.friendshipsService.findPendingFriendRequest(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    return this.friendshipsService.update(+id, updateFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipsService.delete(+id);
  }
}
