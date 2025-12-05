import { Controller, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ROUTE } from '../../commons/constants/url.sistema';
import { UsersServiceDelete } from '../service/users.service.delete';
import { MessageSystem } from '../../commons/message/message.system';
import { Result } from '../../commons/message/message';

@Controller(ROUTE.USERS.BASE)
export class UsersControllerDelete {
  constructor(private readonly service: UsersServiceDelete) {}

  @Delete(ROUTE.USERS.DELETE)
  @HttpCode(HttpStatus.OK)
  async execute(@Param('userId') id: number): Promise<Result<null>> {
    await this.service.execute(id);
    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Usuário excluído com sucesso',
      null,
      null,
      null,
    );
  }
}