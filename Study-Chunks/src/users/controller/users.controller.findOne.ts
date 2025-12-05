import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ROUTE } from '../../commons/constants/url.sistema';
import { UsersServiceFindOne } from '../service/users.service.findOne';
import { UsersConverterDto } from '../dto/converter/users.converter.dto';
import { UsersResponseDto } from '../dto/response/users.response.dto';
import { MessageSystem } from '../../commons/message/message.system';
import { Result } from '../../commons/message/message';

@Controller(ROUTE.USERS.BASE)
export class UsersControllerFindOne {
  constructor(private readonly service: UsersServiceFindOne) {}

  @Get(ROUTE.USERS.FIND_ONE)
  @HttpCode(HttpStatus.OK)
  async execute(@Param('userId') id: number): Promise<Result<UsersResponseDto>> {
    const entity = await this.service.execute(id);
    const responseDto = UsersConverterDto.toUsersResponse(entity);
    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Usuário encontrado com sucesso',
      responseDto,
      null,
      null,
    );
  }
}