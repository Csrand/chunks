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
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { DisciplineRequest } from '../dto/request/discipline.request';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { DisciplineServiceUpdate } from '../service/discipline.service.update';

@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerUpdate {
  constructor(private readonly disciplineServiceUpdate: DisciplineServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.DISCIPLINE.UPDATE)
  async update(
    @Req() res: Request,
    @Param('disciplineID', ParseIntPipe) disciplineID: number,
    @Body() disciplineRequest: DisciplineRequest,
  ): Promise<Result<DisciplineResponse>> {
    const response = await this.disciplineServiceUpdate.update(disciplineID, disciplineRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina alterada com sucesso !',
      response,
      res.path,
      null,
    );
  }
}
