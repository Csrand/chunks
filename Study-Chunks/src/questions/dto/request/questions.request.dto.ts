import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class QuestionsRequestDto {
  @IsNumber({}, { message: 'O ID do submódulo deve ser um número' })
  @Expose()
  submoduleId!: number;

  @IsString({ message: 'O texto da pergunta deve ser uma string' })
  @IsNotEmpty({ message: 'O texto da pergunta é obrigatório' })
  @MaxLength(1000, { message: 'O texto da pergunta deve ter no máximo 1000 caracteres' })
  @Expose()
  questionText!: string;

  @IsString({ message: 'As opções devem ser uma string' })
  @IsOptional()
  @MaxLength(2000, { message: 'As opções devem ter no máximo 2000 caracteres' })
  @Expose()
  options?: string;

  @IsString({ message: 'A resposta correta deve ser uma string' })
  @IsNotEmpty({ message: 'A resposta correta é obrigatória' })
  @MaxLength(1, { message: 'A resposta correta deve ter no máximo 1 caractere' })
  @Expose()
  correctAnswer!: string;
}