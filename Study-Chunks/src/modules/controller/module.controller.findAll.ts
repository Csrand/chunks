import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { ModuleServiceFindAll } from "../service/module.service.findAll";
import { ModuleResponseDto } from "../dto/response/module.response.dto";
import { ModuleConverterDto } from "../dto/converter/module.converter.dto";

@Controller(ROUTE.MODULES.BASE)
export class ModuleControllerFindAll {
  constructor(private readonly moduleServiceFindAll: ModuleServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.MODULES.LIST)
  async findAll(@Req() req: Request): Promise<Result<ModuleResponseDto[]>> {
    const modules = await this.moduleServiceFindAll.findAll();
    const responseDto = ModuleConverterDto.toListModuleResponse(modules);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Módulos listados com sucesso!',
      responseDto,
      req.path,
      null
    );
  }
}
