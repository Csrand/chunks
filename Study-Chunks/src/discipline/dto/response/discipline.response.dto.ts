import { Expose } from "class-transformer";

export class DisciplineResponseDto {
  @Expose()
  disciplineId: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}