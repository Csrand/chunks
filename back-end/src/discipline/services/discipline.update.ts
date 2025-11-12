import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDiscipline } from '../dto/converter/discipline.converter';
import { DisciplineRequest } from '../dto/request/discipline.request';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { Discipline } from '../entities/discipline.entity';
import { DisciplineServiceFindOne } from './discipline.findone';

@Injectable()
export class DisciplineServiceUpdate {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
    private disciplineServiceFindOne: DisciplineServiceFindOne,
  ) {}

  async update(
    disciplineId: number,
    disciplineRequest: DisciplineRequest,
  ): Promise<DisciplineResponse> {
    let discipline = ConverterDiscipline.toDiscipline(disciplineRequest);

    const disciplineCadastrada = await this.disciplineServiceFindOne.findById(disciplineId);

    if (!disciplineCadastrada) {
      throw new HttpException('Disciplina não cadastrada', HttpStatus.NOT_FOUND);
    }

    const disciplineAtualizada = Object.assign(disciplineCadastrada, discipline);

    discipline = await this.disciplineRepository.save(disciplineAtualizada);

    return ConverterDiscipline.toDisciplineResponse(discipline);
  }
}
