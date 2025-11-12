import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDiscipline } from '../dto/converter/discipline.converter';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { Discipline } from '../entities/discipline.entity';

@Injectable()
export class DisciplineServiceFindOne {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  async findOne(disciplineId: number): Promise<DisciplineResponse> {
    const discipline = await this.findById(disciplineId);

    if (!discipline) {
      throw new HttpException('Discipline não cadastrada', HttpStatus.NOT_FOUND);
    }

    return ConverterDiscipline.toDisciplineResponse(discipline);
  }

  async findById(disciplineId: number): Promise<Discipline | null> {
    const discipline = await this.disciplineRepository
      .createQueryBuilder('BD2_DISCIPLINES')
      .where('discipline.disciplineId = :id', { id: disciplineId })
      .getOne();

    return discipline;
  }
}
