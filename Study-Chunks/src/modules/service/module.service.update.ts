import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';
import { ModuleRequestDto } from '../dto/request/module.request.dto';
import { ModuleConverterDto } from '../dto/converter/module.converter.dto';

@Injectable()
export class ModuleServiceUpdate {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async update(id: number, moduleRequestDto: ModuleRequestDto): Promise<ModuleEntity> {
    const moduleToUpdate = ModuleConverterDto.toModuleEntity(moduleRequestDto);

    // The ID from the URL parameter is the source of truth.
    // Assign it to the entity before preloading.
    moduleToUpdate.moduleId = id;
    
    const module = await this.moduleRepository.preload(moduleToUpdate);

    if (!module) {
      throw new NotFoundException(`Módulo com ID ${id} não encontrado.`);
    }

    return this.moduleRepository.save(module);
  }
}
