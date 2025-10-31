import { Expose } from 'class-transformer';

export class Bd2ModuleResponse {
  @Expose()
  moduleId?: number;

  @Expose()
  disciplineId?: number;

  @Expose()
  title?: string;

  @Expose()
  description: string;
}
