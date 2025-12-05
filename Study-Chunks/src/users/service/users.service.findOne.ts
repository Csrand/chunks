import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entity/users.entity';

@Injectable()
export class UsersServiceFindOne {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async execute(id: number): Promise<UsersEntity> {
    const entity = await this.repository.findOne({
      where: { userId: id },
    });

    if (!entity) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return entity;
  }
}