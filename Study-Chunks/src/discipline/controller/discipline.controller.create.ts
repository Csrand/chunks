import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import type { Request } from 'express';
import { DisciplineRequestDto } from "../dto/request/discipline.request.dto";
import { ROUTE } from "src/commons/constants/url.sistema";
import { DisciplineServiceCreate } from "../service/discipline.service.create";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerCreate {
  constructor(private readonly disciplineServiceCreate: DisciplineServiceCreate){}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROUTE.DISCIPLINE.CREATE)
  async create(
    @Req() req: Request,
    @Body() disciplineRequest: DisciplineRequestDto
  ): Promise<Result<DisciplineResponseDto>> {
    const response = await this.disciplineServiceCreate.create(disciplineRequest);

    return MessageSystem.showMessage(
      HttpStatus.CREATED,
      'Disciplina cadastrada com sucesso!',
      response,
      req.path,
      null
    )
  }
}