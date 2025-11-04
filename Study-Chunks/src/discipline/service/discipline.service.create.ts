import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DisciplineEntity } from "../entity/discipline.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { DisciplineRequestDto } from "../dto/request/discipline.request.dto";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";
import { DisciplineConverterDto } from "../dto/converter/discipline.converter.dto";

export class DisciplineServiceCreate {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository:  Repository<DisciplineEntity>
  ){}

  async create(newDiscipline: DisciplineRequestDto): Promise<DisciplineResponseDto> {
    let discipline = DisciplineConverterDto.toDiscipline(newDiscipline);

    const hasDiscipline = await this.disciplineRepository.findOne({
      where: {
        name: discipline.name
      }
    });

    if (hasDiscipline) {
      throw new HttpException('Disciplina com nome informado já está cadastrada', HttpStatus.BAD_REQUEST);
    }

    discipline = await this.disciplineRepository.save(discipline);

    return DisciplineConverterDto.toDisciplineResponse(discipline);
  }
}