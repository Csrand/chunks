import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class DisciplineRequest {
  @Type(() => Number)
  @IsOptional()
  disciplineID?: number;

  @IsNotEmpty({ message: 'Nome da disciplina deve ser informado' })
  @IsString({ message: 'O valor tem quer ser somente texto' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o nome da disciplina',
  })
  name: string;

  @IsNotEmpty({ message: 'Nome da disciplina deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(250, {
    message: 'O tamanho máximo é de 250 caracteres para a descrição da disciplina',
  })
  description: string;

  constructor(data: Partial<DisciplineRequest> = {}) {
    Object.assign(this, data);
  }
}
