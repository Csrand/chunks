import { InjectRepository } from '@nestjs/typeorm';
import { DisciplineEntity } from '../entity/discipline.entity';
import { Not, Repository } from 'typeorm';
import { DisciplineRequestDto } from '../dto/request/discipline.request.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DisciplineConverterDto } from '../dto/converter/discipline.converter.dto';

export class DisciplineServiceUpdate {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository: Repository<DisciplineEntity>,
  ) {}

  async update(disciplineId: number, disciplineRequest: DisciplineRequestDto) {
    const disciplineToUpdate = await this.disciplineRepository.findOne({
      where: {
        disciplineId: disciplineId
      }
    });

    if (!disciplineToUpdate) {
      throw new HttpException(`Disciplina com ID ${disciplineId} não encontrada`, HttpStatus.NOT_FOUND);
    }

    const nameAlreadyExists = await this.disciplineRepository.findOne({
      where: {
        name: disciplineRequest.name,
        disciplineId: Not(disciplineId)
      }
    });

    if (nameAlreadyExists) {
      throw new HttpException(`O nome "${disciplineRequest.name}" já está em uso por outra disciplina`, HttpStatus.CONFLICT); // 409 Conflict é mais semântico aqui
    }

    const discipline = DisciplineConverterDto.toDiscipline(disciplineRequest);

    await this.disciplineRepository.update(disciplineId, discipline);

    Object.assign(disciplineToUpdate, discipline);

    return DisciplineConverterDto.toDisciplineResponse(disciplineToUpdate);
  }
}