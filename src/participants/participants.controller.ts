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
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  // @Get()
  // findConversationForUser(@Request() req) {
  //   return this.participantsService.findConversationForUser(req.user.id);
  // }

  // @Get()
  // findAll() {
  //   return this.participantsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.delete(+id);
  }
}
