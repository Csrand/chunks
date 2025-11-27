import { Controller, Get, HttpCode, HttpStatus, Param, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { SubmoduleServiceFindOne } from "../service/submodule.service.findOne";
import { SubmoduleResponseDto } from "../dto/response/submodule.response.dto";
import { SubmoduleConverterDto } from "../dto/converter/submodule.converter.dto";

@Controller(ROUTE.SUBMODULES.BASE)
export class SubmoduleControllerFindOne {
  constructor(private readonly submoduleServiceFindOne: SubmoduleServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.SUBMODULES.FIND_ONE)
  async findOne(
    @Req() req: Request,
    @Param('submoduleId') submoduleId: number
  ): Promise<Result<SubmoduleResponseDto>> {
    const submodule = await this.submoduleServiceFindOne.findOne(submoduleId);
    const responseDto = SubmoduleConverterDto.toSubmoduleResponse(submodule);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Submódulo encontrado com sucesso!',
      responseDto,
      req.path,
      null
    );
  }
}
