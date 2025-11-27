import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';

@Injectable()
export class ModuleServiceDelete {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async remove(id: number): Promise<void> {
    const result = await this.moduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Módulo com ID ${id} não encontrado.`);
    }
  }
}
