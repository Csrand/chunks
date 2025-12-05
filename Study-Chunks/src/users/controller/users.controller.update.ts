import { Controller, Put, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ROUTE } from '../../commons/constants/url.sistema';
import { UsersServiceUpdate } from '../service/users.service.update';
import { UsersConverterDto } from '../dto/converter/users.converter.dto';
import { UsersResponseDto } from '../dto/response/users.response.dto';
import { MessageSystem } from '../../commons/message/message.system';
import { Result } from '../../commons/message/message';
import { UsersRequestDto } from '../dto/request/users.request.dto';

@Controller(ROUTE.USERS.BASE)
export class UsersControllerUpdate {
  constructor(private readonly service: UsersServiceUpdate) {}

  @Put(ROUTE.USERS.UPDATE)
  @HttpCode(HttpStatus.OK)
  async execute(
    @Param('userId') id: number,
    @Body() requestDto: UsersRequestDto,
  ): Promise<Result<UsersResponseDto>> {
    const entity = await this.service.execute(id, requestDto);
    const responseDto = UsersConverterDto.toUsersResponse(entity);
    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Usuário atualizado com sucesso',
      responseDto,
      null,
      null,
    );
  }
}