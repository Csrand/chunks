import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDiscipline } from '../dto/converter/discipline.converter';
import { DisciplineRequest } from '../dto/request/discipline.request';
import { Discipline } from '../entities/discipline.entity';
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
      .createQueryBuilder('BD2_DISCIPLINES')
      .where('discipline.disciplineName =:name', { name: discipline.disciplineName })
      .getOne();

      if (disciplineCadastrada){
        throw new HttpException('Disciplina com nome informado já está cadastrada', HttpStatus.BAD_REQUEST);
      }

      discipline = await this.disciplineRepository.save(discipline);

    return ConverterDiscipline.toDisciplineResponse(discipline);
  }
}
