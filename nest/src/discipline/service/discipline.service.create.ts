import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDiscipline } from '../dto/converter/discipline.converter';
import { DisciplineRequest } from '../dto/request/discipline.request';
import { Discipline } from '../entity/discipline.entity';
import { DisciplineResponse } from '../dto/response/discipline.response';

@Injectable()
export class DisciplineServiceCreate {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  async create(disciplineRequest: DisciplineRequest): Promise<DisciplineResponse> {
    let discipline = ConverterDiscipline.toDiscipline(disciplineRequest);

    const disciplineCadastrada = await this.disciplineRepository
      .createQueryBuilder('discipline')
      .where('discipline.name =:nome', { nome: discipline.name })
      .getOne();

      if (disciplineCadastrada){
        throw new HttpException('Disciplina com nome informado já está cadastrada', HttpStatus.BAD_REQUEST);
      }

      discipline = await this.disciplineRepository.save(discipline);

    return ConverterDiscipline.toDisciplineResponse(discipline);
  }
}
