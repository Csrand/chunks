import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UsersRequestDto {
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  @MaxLength(50, { message: 'O nome de usuário deve ter no máximo 50 caracteres' })
  @Expose()
  username!: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  @Expose()
  email!: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  @Expose()
  password!: string;

  @IsNumber({}, { message: 'O número de tentativas de login inválidas deve ser um número' })
  @IsOptional()
  @Expose()
  failedLoginAttempts?: number;
}