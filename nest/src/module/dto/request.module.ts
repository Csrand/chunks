
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class Bd2ModuleRequest {
  @Type(() => Number)
  @IsOptional()
  moduleId?: number;

  @IsNotEmpty({ message: 'Titulo do Módulo deve ser informado' })
  @IsString({ message: 'O valor tem quer ser somente texto' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome da disciplina',
  })
  title: string;

  @IsNotEmpty({ message: 'Nome da disciplina deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(250, {
    message: 'O tamanho máximo é de 250 caracteres para a descrição da disciplina',
  })
  description: string;
}
