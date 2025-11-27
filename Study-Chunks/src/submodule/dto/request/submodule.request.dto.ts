import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SubmoduleRequestDto {
  @IsOptional()
  @IsNumber({}, { message: 'O campo submoduleId deve ser um número.' })
  submoduleId?: number;

  @IsNotEmpty({ message: 'O campo moduleId não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo moduleId deve ser um número.' })
  moduleId: number;

  @IsNotEmpty({ message: 'O campo title não pode estar vazio.' })
  @IsString({ message: 'O campo title deve ser uma string.' })
  @MaxLength(100, { message: 'O campo title deve ter no máximo 100 caracteres.' })
  title: string;

  @IsNotEmpty({ message: 'O campo explanation não pode estar vazio.' })
  @IsString({ message: 'O campo explanation deve ser uma string.' })
  explanation: string;
}
