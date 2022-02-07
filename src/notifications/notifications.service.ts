import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { INotification } from './entities/notification.interface';

@Injectable()
export class NotificationsService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification) repository: Repository<Notification>
  ) {
    super(repository)
  }
  async create(createNotificationDto: CreateNotificationDto): Promise<INotification> {
    const date = new Date().toISOString();
    let data = {
      ...createNotificationDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.repository.save(data);
  }
}
