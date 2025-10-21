import { Expose } from 'class-transformer';

export class DisciplineResponse {
  @Expose()
  disciplineID?: number;

  @Expose()
  name: string = '';

  @Expose()
  description: string = '';
}
