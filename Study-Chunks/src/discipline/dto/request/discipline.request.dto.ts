import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class DisciplineRequestDto {
  @Type(() => Number)
  @IsOptional()
  disciplineId: number;

  @IsString({message: 'O valor deve ser uma string'})
  @IsNotEmpty({message: 'O campo nome não pode ser vazio'})
  @MaxLength(120, {message: 'O nome deve ter no máximo 120 caracteres'})
  name: string;

  @IsString({message: 'O valor deve ser uma string'})
  @IsNotEmpty({message: 'O campo description não pode ser vazio'})
  @MaxLength(255, {message: 'O description deve ter no máximo 120 caracteres'})
  description: string;
}