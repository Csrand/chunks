import { Expose } from 'class-transformer';
import { UserProgressResponseDto } from '../../../userProgress/dto/response/userProgress.response.dto';
import { AnswersResponseDto } from '../../../answers/dto/response/answers.response.dto';
import { BadgesResponseDto } from '../../../badges/dto/response/badges.response.dto';

export class UsersResponseDto {
  @Expose()
  userId!: number;

  @Expose()
  username!: string;

  @Expose()
  email!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  failedLoginAttempts!: number;

  @Expose()
  userProgresses?: UserProgressResponseDto[];

  @Expose()
  answers?: AnswersResponseDto[];

  @Expose()
  badges?: BadgesResponseDto[];
}