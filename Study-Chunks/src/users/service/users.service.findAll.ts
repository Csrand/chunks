import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entity/users.entity';

@Injectable()
export class UsersServiceFindAll {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async execute(): Promise<UsersEntity[]> {
    return await this.repository.find({
      order: { userId: 'ASC' },
    });
  }
}