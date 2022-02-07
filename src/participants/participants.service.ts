import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';
import { IParticipant } from './entities/participant.interface';

@Injectable()
export class ParticipantsService extends BaseService<Participant> {
  constructor(
    @InjectRepository(Participant) repository: Repository<Participant>
  ) {
    super(repository)
  }
  async create(createParticipantDto: CreateParticipantDto): Promise<IParticipant> {
    const date = new Date().toISOString();
    let data = {
      ...createParticipantDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.repository.save(data);
  }
}
