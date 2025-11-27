import { Expose, Type } from 'class-transformer';
import { DisciplineResponseDto } from 'src/discipline/dto/response/discipline.response.dto';

export class ModuleResponseDto {
  @Expose()
  moduleId: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => DisciplineResponseDto)
  discipline: DisciplineResponseDto;
}
