import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bd2Module } from '../entities/module.entity';
import { Bd2ModuleResponse } from '../dto/response.module';
import { ConverterModulo } from '../dto/converter/converter.module';

@Injectable()
export class Bd2ModuleServiceFindAll {
  constructor(
    @InjectRepository(Bd2Module)
    private Bd2ModuleRepository: Repository<Bd2Module>,
  ) {}

  async findAll(): Promise<Bd2ModuleResponse[]> {
    const Bd2Modules = await this.Bd2ModuleRepository
      .createQueryBuilder('Bd2Modules')
      .getMany();

    return ConverterModulo.toListBd2ModuleResponse(Bd2Modules);
  }
}
