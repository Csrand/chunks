import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bd2Module } from '../entities/module.entity';
import { Bd2ModuleResponse } from '../dto/response.module';
import { ConverterModulo } from '../dto/converter/converter.module';

@Injectable()
export class Bd2ModuleServiceFindOne {
  constructor(
    @InjectRepository(Bd2Module)
    private bd2ModuleRepository: Repository<Bd2Module>,
  ) {}

  async findOne(bd2ModuleID: number): Promise<Bd2ModuleResponse> {
    const bd2Module = await this.findById(bd2ModuleID);

    if (!bd2Module) {
      throw new HttpException('Bd2Module não cadastrada', HttpStatus.NOT_FOUND);
    }

    return ConverterModulo.toBd2Module(bd2Module);
  }

  async findById(bd2ModuleID: number): Promise<Bd2Module | null> {
    const bd2Module = await this.bd2ModuleRepository
      .createQueryBuilder('bd2Module')
      .where('bd2Module.BD2_MODULE_ID = :bd2ModuleID', { bd2ModuleID: bd2ModuleID })
      .getOne();

    return bd2Module;
  }
}
