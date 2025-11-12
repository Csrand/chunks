import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDiscipline } from '../dto/converter/discipline.converter';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { Discipline } from '../entities/discipline.entity';

@Injectable()
export class DisciplineServiceFindAll {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  async findAll(): Promise<DisciplineResponse[]> {
    const disciplines = await this.disciplineRepository
      .createQueryBuilder('discipline')
      .getMany();

    return ConverterDiscipline.toListDisciplineResponse(disciplines);
  }
}
