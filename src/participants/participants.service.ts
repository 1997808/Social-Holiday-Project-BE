import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { IParticipant } from './entities/participant.interface';

@Injectable()
export class ParticipantsService extends BaseService<Participant> {
  constructor(
    @InjectRepository(Participant) repository: Repository<Participant>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ConversationsService))
    private readonly conversationsService: ConversationsService,
  ) {
    super(repository);
  }
  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<IParticipant> {
    const date = new Date().toISOString();
    const user = await this.usersService.findById(createParticipantDto.userid);
    const conversation = await this.conversationsService.findById(
      createParticipantDto.conversationid,
    );
    const data = {
      ...createParticipantDto,
      user,
      conversation,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async createMany(conversationid: number, userids: number[]): Promise<any> {
    for (const userid of userids) {
      await this.create({ userid, conversationid });
    }
  }

  async findConversationForUser(userid: number): Promise<any> {
    const result = await this.repository.find({
      where: [{ userId: userid }],
    });
    const conversations = result.map((item) => item.conversationId);
    return conversations;
  }
}
