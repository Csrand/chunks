import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';
import { SubmoduleRequestDto } from '../dto/request/submodule.request.dto';
import { SubmoduleConverterDto } from '../dto/converter/submodule.converter.dto';

@Injectable()
export class SubmoduleServiceCreate {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async create(submoduleRequestDto: SubmoduleRequestDto): Promise<SubmoduleEntity> {
    const submoduleEntity = SubmoduleConverterDto.toSubmoduleEntity(submoduleRequestDto);
    return await this.submoduleRepository.save(submoduleEntity);
  }
}
