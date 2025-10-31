import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class Bd2Module{
  @Type(() => Number)
  @IsOptional()
  moduleId?: number;

  @IsNotEmpty({ message: 'ID da Disciplina deve ser informado' })
  @IsNumber({}, { message: 'Discipline ID deve ser um número' })
  disciplineId?: number;

  @IsNotEmpty({ message: 'Título do Módulo deve ser informado' })
  @IsString({ message: 'O valor tem que ser somente texto' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o título do módulo',
  })
  title: string;

  @IsNotEmpty({ message: 'Descrição do módulo deve ser informada' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(250, {
    message: 'O tamanho máximo é de 250 caracteres para a descrição do módulo',
  })
  description: string;
}
