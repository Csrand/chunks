import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { ModuleRequestDto } from "../dto/request/module.request.dto";
import { ModuleServiceCreate } from "../service/module.service.create";
import { ModuleResponseDto } from "../dto/response/module.response.dto";
import { ModuleConverterDto } from "../dto/converter/module.converter.dto";

@Controller(ROUTE.MODULES.BASE)
export class ModuleControllerCreate {
  constructor(private readonly moduleServiceCreate: ModuleServiceCreate){}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROUTE.MODULES.CREATE)
  async create(
    @Req() req: Request,
    @Body() moduleRequest: ModuleRequestDto
  ): Promise<Result<ModuleResponseDto>> {
    const moduleEntity = await this.moduleServiceCreate.create(moduleRequest);
    const responseDto = ModuleConverterDto.toModuleResponse(moduleEntity);

    return MessageSystem.showMessage(
      HttpStatus.CREATED,
      'Módulo cadastrado com sucesso!',
      responseDto,
      req.path,
      null
    )
  }
}
