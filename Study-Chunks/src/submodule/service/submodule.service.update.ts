import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';
import { SubmoduleRequestDto } from '../dto/request/submodule.request.dto';
import { SubmoduleConverterDto } from '../dto/converter/submodule.converter.dto';

@Injectable()
export class SubmoduleServiceUpdate {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async update(id: number, submoduleRequestDto: SubmoduleRequestDto): Promise<SubmoduleEntity> {
    const submoduleToUpdate = SubmoduleConverterDto.toSubmoduleEntity(submoduleRequestDto);

    // The ID from the URL parameter is the source of truth.
    // Assign it to the entity before preloading.
    submoduleToUpdate.submoduleId = id;

    const submodule = await this.submoduleRepository.preload(submoduleToUpdate);

    if (!submodule) {
      throw new NotFoundException(`Submódulo com ID ${id} não encontrado.`);
    }

    return this.submoduleRepository.save(submodule);
  }
}
