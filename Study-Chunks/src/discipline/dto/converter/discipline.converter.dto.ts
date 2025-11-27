import { plainToInstance } from 'class-transformer';
import { DisciplineRequestDto } from '../request/discipline.request.dto';
import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';
import { DisciplineResponseDto } from '../response/discipline.response.dto';

export class DisciplineConverterDto {
  static toDiscipline(disciplineRequest: DisciplineRequestDto) {
    const disciplineEntity = new DisciplineEntity();

    if (disciplineRequest.disciplineId != null) {
      disciplineEntity.disciplineId = disciplineRequest.disciplineId;
    }
    disciplineEntity.name = disciplineRequest.name;
    disciplineEntity.description = disciplineRequest.description;

    return disciplineEntity;
  }

  static toDisciplineResponse(disciplines: DisciplineEntity): DisciplineResponseDto {
    return plainToInstance(DisciplineResponseDto, disciplines, {
      excludeExtraneousValues: true,
    });
  }

  static toListDisciplineResponse(disciplines: DisciplineEntity[] = []): DisciplineResponseDto[] {
    return plainToInstance(DisciplineResponseDto, disciplines, {
      excludeExtraneousValues: true,
    });
  }
}
