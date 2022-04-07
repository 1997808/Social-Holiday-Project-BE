import { Injectable } from '@nestjs/common';
import { EntityId } from 'typeorm/repository/EntityId';
import { BaseEntity, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {
    this.repository = repository;
  }

  async index(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: EntityId): Promise<T> {
    return await this.repository.findOne(id);
  }

  async findByIds(ids: [EntityId]): Promise<T[]> {
    return await this.repository.findByIds(ids);
  }

  async findOne(opts: any = {}): Promise<T> {
    return await this.repository.findOne(opts);
  }

  async findAll(opts: any = {}): Promise<T[]> {
    return await this.repository.find(opts);
  }

  async update(filter: any = {}, update: any = {}): Promise<T> {
    await this.repository.update(filter, update);
    return this.findOne(filter);
  }

  async delete(opts: any = {}): Promise<DeleteResult> {
    return await this.repository.delete(opts);
  }

  async count(opts: any = {}): Promise<number> {
    return await this.repository.count(opts);
  }
}
