import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';

@Injectable()
export class SubmoduleServiceFindAll {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async findAll(): Promise<SubmoduleEntity[]> {
    return await this.submoduleRepository.find({
      relations: ['module'],
      order: {
        submoduleId: 'ASC'
      }
    });
  }
}
