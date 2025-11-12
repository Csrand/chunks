import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/message';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { DisciplineRequest } from '../dto/request/discipline.request';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { DisciplineServiceCreate } from '../services/discipline.create';

@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerCreate {
  constructor(private readonly disciplineServiceCreate: DisciplineServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.DISCIPLINE.CREATE)
  async create(
    @Req() req: Request,
    @Body() disciplineRequest: DisciplineRequest,
  ): Promise<Result<DisciplineResponse>> {
    const response = await this.disciplineServiceCreate.create(disciplineRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Disciplina cadastrada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
