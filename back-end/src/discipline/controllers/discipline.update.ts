import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { DisciplineRequest } from "..//request/discipline.request";
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { DisciplineResponse } from "..//response/discipline.response.";
import { DisciplineServiceUpdate } from '../service/discipline.service.update';

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerUpdate {
  constructor(private readonly disciplineServiceUpdate: DisciplineServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.DISCIPLINE.UPDATE)
  async create(
    @Req() req: Request,
    @Param('disciplineId', ParseIntPipe) disciplineId: number,
    @Body() disciplineRequest: DisciplineRequest
  ): Promise<Result<DisciplineResponse>> {
    const response = await this.disciplineServiceUpdate.update(disciplineId, disciplineRequest);

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Disciplina atualizada com sucesso!',
      response,
      req.path,
      null
    )
  }
}
