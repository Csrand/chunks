import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ROUTE } from '../../commons/constants/url.sistema';
import { UsersServiceCreate } from '../service/users.service.create';
import { UsersConverterDto } from '../dto/converter/users.converter.dto';
import { UsersResponseDto } from '../dto/response/users.response.dto';
import { MessageSystem } from '../../commons/message/message.system';
import { Result } from '../../commons/message/message';
import { UsersRequestDto } from '../dto/request/users.request.dto';

@Controller(ROUTE.USERS.BASE)
export class UsersControllerCreate {
  constructor(private readonly service: UsersServiceCreate) {}

  @Post(ROUTE.USERS.CREATE)
  @HttpCode(HttpStatus.CREATED)
  async execute(@Body() requestDto: UsersRequestDto): Promise<Result<UsersResponseDto>> {
    const entity = await this.service.execute(requestDto);
    const responseDto = UsersConverterDto.toUsersResponse(entity);
    return MessageSystem.showMessage(
      HttpStatus.CREATED,
      'Usuário criado com sucesso',
      responseDto,
      null,
      null,
    );
  }
}