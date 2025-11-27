import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';

@Injectable()
export class ModuleServiceFindOne {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async findOne(id: number): Promise<ModuleEntity> {
    const module = await this.moduleRepository.findOne({
      where: { moduleId: id },
      relations: ['discipline'],
    });
    if (!module) {
      throw new NotFoundException(`Módulo com ID ${id} não encontrado.`);
    }
    return module;
  }
}
