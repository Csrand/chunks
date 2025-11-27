import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { SubmoduleRequestDto } from "../dto/request/submodule.request.dto";
import { SubmoduleServiceUpdate } from "../service/submodule.service.update";
import { SubmoduleResponseDto } from "../dto/response/submodule.response.dto";
import { SubmoduleConverterDto } from "../dto/converter/submodule.converter.dto";

@Controller(ROUTE.SUBMODULES.BASE)
export class SubmoduleControllerUpdate {
  constructor(private readonly submoduleServiceUpdate: SubmoduleServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Patch(ROUTE.SUBMODULES.UPDATE)
  async update(
    @Req() req: Request,
    @Param('submoduleId') submoduleId: number,
    @Body() submoduleRequest: SubmoduleRequestDto
  ): Promise<Result<SubmoduleResponseDto>> {
    const updatedSubmodule = await this.submoduleServiceUpdate.update(submoduleId, submoduleRequest);
    const responseDto = SubmoduleConverterDto.toSubmoduleResponse(updatedSubmodule);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Submódulo atualizado com sucesso!',
      responseDto,
      req.path,
      null
    );
  }
}
