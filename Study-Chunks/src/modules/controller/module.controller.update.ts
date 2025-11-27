import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { ModuleRequestDto } from "../dto/request/module.request.dto";
import { ModuleServiceUpdate } from "../service/module.service.update";
import { ModuleResponseDto } from "../dto/response/module.response.dto";
import { ModuleConverterDto } from "../dto/converter/module.converter.dto";

@Controller(ROUTE.MODULES.BASE)
export class ModuleControllerUpdate {
  constructor(private readonly moduleServiceUpdate: ModuleServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Patch(ROUTE.MODULES.UPDATE)
  async update(
    @Req() req: Request,
    @Param('moduleId') moduleId: number,
    @Body() moduleRequest: ModuleRequestDto
  ): Promise<Result<ModuleResponseDto>> {
    const updatedModule = await this.moduleServiceUpdate.update(moduleId, moduleRequest);
    const responseDto = ModuleConverterDto.toModuleResponse(updatedModule);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Módulo atualizado com sucesso!',
      responseDto,
      req.path,
      null
    );
  }
}
