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
import { FRIENDSHIP_STATUS, RES_MESSAGE } from 'src/common/constant';

@UseGuards(JwtAuthGuard)
@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post()
  async handleAddFriend(
    @Body() createFriendshipDto: CreateFriendshipDto,
    @Request() req,
  ) {
    if (createFriendshipDto.receiver === req.user.id) {
      return { message: 'Unable to send to yourself' };
    }
    const friendship = await this.friendshipsService.checkExistedFriendRequest(
      createFriendshipDto.receiver,
      req.user.id,
    );
    if (friendship) {
      switch (friendship.status) {
        case FRIENDSHIP_STATUS.PENDING:
          return { message: 'Request already existed' };
        case FRIENDSHIP_STATUS.ACCEPTED:
          return { message: 'Already friend' };
        case FRIENDSHIP_STATUS.DECLINED:
        case FRIENDSHIP_STATUS.CANCEL:
          return await this.friendshipsService.update(
            { id: friendship.id },
            { status: FRIENDSHIP_STATUS.PENDING },
          );
      }
    } else {
      return await this.friendshipsService.create(
        req.user,
        createFriendshipDto,
      );
    }
  }

  @Get('/all')
  findAll() {
    return this.friendshipsService.findAll();
  }

  @Get('/pending')
  findPendingFriendRequest(@Request() req) {
    return this.friendshipsService.findPendingFriendRequest(req.user.id);
  }

  @Get('/friend')
  findFriend(@Request() req) {
    return this.friendshipsService.findFriend(req.user.id);
  }

  @Get('check/:userid')
  async checkUserFriendRequestStatus(
    @Request() req,
    @Param('userid') userid: string,
  ) {
    const status = await this.friendshipsService.checkUserFriendRequestStatus(
      req.user.id,
      +userid,
    );
    return status;
  }

  @Get('find/:userid')
  async findUserFriendRequest(@Request() req, @Param('userid') userid: string) {
    const request = await this.friendshipsService.findUserFriendRequest(
      req.user.id,
      +userid,
    );
    return request;
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
      return { message: RES_MESSAGE.FAILED };
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
      return { message: RES_MESSAGE.FAILED };
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
      return { message: RES_MESSAGE.FAILED };
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
