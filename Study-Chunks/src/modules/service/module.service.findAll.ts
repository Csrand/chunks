import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';

@Injectable()
export class ModuleServiceFindAll {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async findAll(): Promise<ModuleEntity[]> {
    return await this.moduleRepository.find({
      relations: ['discipline'],
      order: {
        moduleId: 'ASC'
      }
    });
  }
}
