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
  async create(
    @Body() createFriendshipDto: CreateFriendshipDto,
    @Request() req,
  ) {
    if (createFriendshipDto.receiver === req.user.id) {
      return { message: 'Unable to send to yourself' };
    }
    if (
      await this.friendshipsService.checkExistedFriendRequest(
        createFriendshipDto.receiver,
        req.user.id,
      )
    ) {
      return { message: 'Request already existed' };
    }
    return await this.friendshipsService.create(req.user, createFriendshipDto);
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
  findOne(@Param('id') id: number) {
    return this.friendshipsService.findOne(+id);
  }

  @Post('/acceptFriendRequest')
  acceptRequestStatus(
    @Request() req,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    if (
      this.friendshipsService.checkUserIsReceiver(
        updateFriendshipDto.id,
        req.user.id,
      )
    ) {
      return this.friendshipsService.acceptFriendRequest(
        updateFriendshipDto.id,
      );
    } else {
      return { message: 'failed' };
    }
  }

  @Post('/declineFriendRequest')
  declineFriendRequest(
    @Request() req,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    if (
      this.friendshipsService.checkUserIsReceiver(
        updateFriendshipDto.id,
        req.user.id,
      )
    ) {
      return this.friendshipsService.declineFriendRequest(
        updateFriendshipDto.id,
      );
    } else {
      return { message: 'failed' };
    }
  }

  @Post('/cancelFriendRequest')
  cancelFriendRequest(
    @Request() req,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    if (
      this.friendshipsService.checkUserIsCreator(
        updateFriendshipDto.id,
        req.user.id,
      )
    ) {
      return this.friendshipsService.cancelFriendRequest(
        updateFriendshipDto.id,
      );
    } else {
      return { message: 'failed' };
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    return this.friendshipsService.update(+id, updateFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.friendshipsService.delete(+id);
  }
}
