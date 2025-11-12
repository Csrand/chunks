import { InjectRepository } from '@nestjs/typeorm';
import { Discipline } from '../entities/discipline.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class DisciplineServiceDelete {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>
  ){}

  async delete(disciplineId: number) {
    const disciplineToDelete = await this.disciplineRepository.findOne({
      where: { disciplineId: disciplineId },
    });

    if (!disciplineToDelete) {
      throw new HttpException(
        `Disciplina com ID ${disciplineId} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.disciplineRepository.delete(disciplineId);
  }
}
