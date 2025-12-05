import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ROUTE } from '../../commons/constants/url.sistema';
import { UsersServiceFindAll } from '../service/users.service.findAll';
import { UsersConverterDto } from '../dto/converter/users.converter.dto';
import { UsersResponseDto } from '../dto/response/users.response.dto';
import { MessageSystem } from '../../commons/message/message.system';
import { Result } from '../../commons/message/message';

@Controller(ROUTE.USERS.BASE)
export class UsersControllerFindAll {
  constructor(private readonly service: UsersServiceFindAll) {}

  @Get(ROUTE.USERS.LIST)
  @HttpCode(HttpStatus.OK)
  async execute(): Promise<Result<UsersResponseDto[]>> {
    const entities = await this.service.execute();
    const responseDto = UsersConverterDto.toListUsersResponse(entities);
    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Usuários listados com sucesso',
      responseDto,
      null,
      null,
    );
  }
}