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
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Request() req,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    const users = [];
    // forEach error here
    for (const item of createConversationDto.participants) {
      const user = await this.usersService.findOne({ id: item });
      if (user) {
        users.push(user);
      }
    }
    users.push(req.user);
    const data = {
      type: createConversationDto.type,
      participants: users,
    };
    return await this.conversationsService.create(data);
  }

  @Get()
  findConversationForUser(@Request() req) {
    return this.conversationsService.findConversationForUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationsService.delete(+id);
  }
}
