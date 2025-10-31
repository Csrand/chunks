import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterModulo } from '../dto/converter/converter.module';
import { Bd2Module } from '../entities/module.entity';
import { Bd2ModuleRequest } from '../dto/request.module';
import { Bd2ModuleResponse } from '../dto/response.module';

@Injectable()
export class Bd2ModuleServiceCreate {
    constructor(
        @InjectRepository(Bd2Module)
        private bd2ModuleRepository: Repository<Bd2Module>,
    ) {}

    async create(bd2ModuleRequest: Bd2ModuleRequest): Promise<Bd2ModuleResponse> {
        let bd2module = ConverterModulo.toBd2Module(bd2ModuleRequest);

        const bd2ModuleCadastrado = await this.bd2ModuleRepository
            .createQueryBuilder('bd2Module')
            .where('bd2Module.title =:title', { title: bd2module.title })
            .getOne();

        if (bd2ModuleCadastrado){
            throw new HttpException('Modulo com nome informado já está cadastrado', HttpStatus.BAD_REQUEST);
        }

        bd2module = await this.bd2ModuleRepository.save(bd2module);

        return ConverterModulo.toBd2Module(bd2module);
    }
}
