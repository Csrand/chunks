import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { SubmoduleServiceDelete } from "../service/submodule.service.delete";

@Controller(ROUTE.SUBMODULES.BASE)
export class SubmoduleControllerDelete {
  constructor(private readonly submoduleServiceDelete: SubmoduleServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.SUBMODULES.DELETE)
  async remove(
    @Req() req: Request,
    @Param('submoduleId') submoduleId: number
  ): Promise<Result<null>> {
    await this.submoduleServiceDelete.remove(submoduleId);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Submódulo removido com sucesso!',
      null,
      req.path,
      null
    );
  }
}
