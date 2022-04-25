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
import { ParticipantsService } from 'src/participants/participants.service';
// import { User } from 'src/users/entities/user.entity';
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
    private readonly participantsService: ParticipantsService,
  ) {}

  @Post()
  async create(
    @Request() req,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    const userids = createConversationDto.userids;
    userids.push(req.user.id);
    const data = {
      type: createConversationDto.type,
    };
    const conversation = await this.conversationsService.create(data);
    if (conversation) {
      await this.participantsService.createMany(conversation.id, userids);
    }
    return conversation;
  }

  @Get()
  async findConversationForUser(@Request() req) {
    const conversationIds =
      await this.participantsService.findConversationForUser(req.user.id);
    return await this.conversationsService.findConversationByIds(
      conversationIds,
    );
  }

  @Get(':id')
  async findConversation(@Param('id') id: string, @Request() req) {
    const result = await this.conversationsService.findConversation(+id);
    if (result.type === 0) {
      const participant = result.participants.filter(
        (item) => item.userId !== req.user.id,
      );
      result.title = participant[0].user.name;
    }
    return result;
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
