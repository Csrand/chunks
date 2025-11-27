import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { SubmoduleRequestDto } from "../dto/request/submodule.request.dto";
import { SubmoduleServiceCreate } from "../service/submodule.service.create";
import { SubmoduleResponseDto } from "../dto/response/submodule.response.dto";
import { SubmoduleConverterDto } from "../dto/converter/submodule.converter.dto";

@Controller(ROUTE.SUBMODULES.BASE)
export class SubmoduleControllerCreate {
  constructor(private readonly submoduleServiceCreate: SubmoduleServiceCreate){}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROUTE.SUBMODULES.CREATE)
  async create(
    @Req() req: Request,
    @Body() submoduleRequest: SubmoduleRequestDto
  ): Promise<Result<SubmoduleResponseDto>> {
    const submoduleEntity = await this.submoduleServiceCreate.create(submoduleRequest);
    const responseDto = SubmoduleConverterDto.toSubmoduleResponse(submoduleEntity);

    return MessageSystem.showMessage(
      HttpStatus.CREATED,
      'Submódulo cadastrado com sucesso!',
      responseDto,
      req.path,
      null
    )
  }
}
