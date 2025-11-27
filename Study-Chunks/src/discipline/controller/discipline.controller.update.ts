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
import { DisciplineRequestDto } from "../dto/request/discipline.request.dto";
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";
import { DisciplineServiceUpdate } from '../service/discipline.service.update';

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerUpdate {
  constructor(private readonly disciplineServiceUpdate: DisciplineServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.DISCIPLINE.UPDATE)
  async create(
    @Req() req: Request,
    @Param('disciplineId', ParseIntPipe) disciplineId: number,
    @Body() disciplineRequest: DisciplineRequestDto
  ): Promise<Result<DisciplineResponseDto>> {
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