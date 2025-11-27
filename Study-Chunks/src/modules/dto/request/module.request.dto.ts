import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ModuleRequestDto {
  @IsOptional()
  @IsNumber({}, { message: 'O campo moduleId deve ser um número.' })
  moduleId?: number;

  @IsNotEmpty({ message: 'O campo disciplineId não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo disciplineId deve ser um número.' })
  disciplineId: number;

  @IsNotEmpty({ message: 'O campo title não pode estar vazio.' })
  @IsString({ message: 'O campo title deve ser uma string.' })
  @MaxLength(100, { message: 'O campo title deve ter no máximo 100 caracteres.' })
  title: string;

  @IsNotEmpty({ message: 'O campo description não pode estar vazio.' })
  @IsString({ message: 'O campo description deve ser uma string.' })
  @MaxLength(255, { message: 'O campo description deve ter no máximo 255 caracteres.' })
  description: string;
}
