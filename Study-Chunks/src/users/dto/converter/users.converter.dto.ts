import { plainToInstance } from 'class-transformer';
import { UsersEntity } from '../../entity/users.entity';
import { UsersRequestDto } from '../request/users.request.dto';
import { UsersResponseDto } from '../response/users.response.dto';

export class UsersConverterDto {
  static toUsersEntity(requestDto: UsersRequestDto): UsersEntity {
    const entity = new UsersEntity();
    entity.username = requestDto.username;
    entity.email = requestDto.email;
    entity.passwordHash = requestDto.password; // The password should be hashed before saving
    entity.failedLoginAttempts = requestDto.failedLoginAttempts ?? 0;
    return entity;
  }

  static toUsersResponse(entity: UsersEntity): UsersResponseDto {
    return plainToInstance(UsersResponseDto, {
      userId: entity.userId,
      username: entity.username,
      email: entity.email,
      createdAt: entity.createdAt,
      failedLoginAttempts: entity.failedLoginAttempts,
    });
  }

  static toListUsersResponse(entities: UsersEntity[]): UsersResponseDto[] {
    return entities.map(entity => this.toUsersResponse(entity));
  }
}