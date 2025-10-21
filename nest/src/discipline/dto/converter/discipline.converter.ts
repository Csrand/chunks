import { plainToInstance } from 'class-transformer';
import { Discipline } from 'src/discipline/entity/discipline.entity';
import { DisciplineRequest } from '../request/discipline.request';
import { DisciplineResponse } from '../response/discipline.response';

export class ConverterDiscipline {
  static toDiscipline(disciplineRequest: DisciplineRequest) {
    const discipline = new Discipline();

    if (disciplineRequest.disciplineID != null) {
      discipline.disciplineID = disciplineRequest.disciplineID;
    }
    discipline.name = disciplineRequest.name;
    discipline.description = disciplineRequest.description;

    return discipline;
  }

  static toDisciplineResponse(discipline: Discipline): DisciplineResponse {
    return plainToInstance(DisciplineResponse, discipline, {
      excludeExtraneousValues: true,
    });
  }

  static toListDisciplineResponse(disciplines: Discipline[] = []): DisciplineResponse[] {
    return plainToInstance(DisciplineResponse, disciplines, {
      excludeExtraneousValues: true,
    });
  }
}
