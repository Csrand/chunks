import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDiscipline } from '../dto/converter/discipline.converter';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { Discipline } from '../entity/discipline.entity';

@Injectable()
export class DisciplineServiceFindOne {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  async findOne(idDiscipline: number): Promise<DisciplineResponse> {
    const discipline = await this.findById(idDiscipline);

    if (!discipline) {
      throw new HttpException('Discipline não cadastrada', HttpStatus.NOT_FOUND);
    }

    return ConverterDiscipline.toDisciplineResponse(discipline);
  }

  async findById(idDiscipline: number): Promise<Discipline | null> {
    const discipline = await this.disciplineRepository
      .createQueryBuilder('discipline')
      .where('discipline.ID_DISCIPLINE = :idDiscipline', { idDiscipline: idDiscipline })
      .getOne();

    return discipline;
  }
}
