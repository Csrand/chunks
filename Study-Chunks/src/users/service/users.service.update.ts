import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entity/users.entity';
import { UsersRequestDto } from '../../dto/request/users.request.dto';
import { UsersConverterDto } from '../../dto/converter/users.converter.dto';

@Injectable()
export class UsersServiceUpdate {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async execute(id: number, requestDto: UsersRequestDto): Promise<UsersEntity> {
    const entity = await this.repository.preload({
      userId: id,
      ...UsersConverterDto.toUsersEntity(requestDto),
    });

    if (!entity) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.repository.save(entity);
  }
}