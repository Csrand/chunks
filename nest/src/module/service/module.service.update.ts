import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bd2Module } from '../entities/module.entity';
import { Bd2ModuleServiceFindOne } from './module.service.findone';
import { Bd2ModuleRequest } from '../dto/request.module';
import { Bd2ModuleResponse } from '../dto/response.module';
import { ConverterModulo } from '../dto/converter/converter.module';

@Injectable()
export class Bd2ModuleServiceUpdate {
  constructor(
    @InjectRepository(Bd2Module)
    private bd2moduleRepository: Repository<Bd2Module>,
    private bd2moduleServiceFindOne: Bd2ModuleServiceFindOne,
  ) {}

  async update(
    bd2moduleID: number,
    bd2moduleRequest: Bd2ModuleRequest,
  ): Promise<Bd2ModuleResponse> {
    let bd2module = ConverterModulo.toBd2Module(bd2moduleRequest);

    const bd2moduleCadastrado = await this.bd2moduleServiceFindOne.findById(bd2moduleID);

    if (!bd2moduleCadastrado) {
      throw new HttpException('Modulo não cadastrado', HttpStatus.NOT_FOUND);
    }

    const bd2moduleAtualizado = Object.assign(bd2moduleCadastrado, bd2module);

    bd2module = await this.bd2moduleRepository.save(bd2moduleAtualizado);

    return ConverterModulo.toBd2ModuleResponse(bd2module);
  }
}
