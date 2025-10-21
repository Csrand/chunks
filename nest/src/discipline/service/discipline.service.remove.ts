import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from '../entity/discipline.entity';
import { DisciplineServiceFindOne } from './discipline.service.findone';

@Injectable()
export class DisciplineServiceRemove {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
    private readonly service: DisciplineServiceFindOne,
  ) {}

  async remove(disciplineID: number): Promise<void> {
    const discipline = await this.service.findById(disciplineID);

    if (!discipline?.disciplineID) {
      throw new HttpException('Disciplina não cadastrada', HttpStatus.NOT_FOUND);
    }

    await this.disciplineRepository
      .createQueryBuilder('discipline')
      .delete()
      .from(Discipline)
      .where('discipline.DISCIPLINE_ID =:disciplineID ', {
        disciplineID: discipline?.disciplineID,
      })
      .execute();
  }
}
