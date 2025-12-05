import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entity/users.entity';
import { UsersRequestDto } from '../../dto/request/users.request.dto';
import { UsersConverterDto } from '../../dto/converter/users.converter.dto';

@Injectable()
export class UsersServiceCreate {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async execute(requestDto: UsersRequestDto): Promise<UsersEntity> {
    const entity = UsersConverterDto.toUsersEntity(requestDto);
    return await this.repository.save(entity);
  }
}