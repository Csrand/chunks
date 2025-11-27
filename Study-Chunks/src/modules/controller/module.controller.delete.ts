import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { ModuleServiceDelete } from "../service/module.service.delete";

@Controller(ROUTE.MODULES.BASE)
export class ModuleControllerDelete {
  constructor(private readonly moduleServiceDelete: ModuleServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.MODULES.DELETE)
  async remove(
    @Req() req: Request,
    @Param('moduleId') moduleId: number
  ): Promise<Result<null>> {
    await this.moduleServiceDelete.remove(moduleId);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Módulo removido com sucesso!',
      null,
      req.path,
      null
    );
  }
}
