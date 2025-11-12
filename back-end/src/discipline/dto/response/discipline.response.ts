
import { Expose } from 'class-transformer';

export class DisciplineResponse {
  @Expose()
  disciplineId?: number;

  @Expose()
  disciplineName: string = '';

  @Expose()
  description: string = '';
}
