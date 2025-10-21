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
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { DisciplineRequest } from '../dto/request/discipline.request';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { DisciplineServiceCreate } from '../service/discipline.service.create';

@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerCreate {
  constructor(private readonly disciplineServiceCreate: DisciplineServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.DISCIPLINE.CREATE)
  async create(
    @Req() res: Request,
    @Body() disciplineRequest: DisciplineRequest,
  ): Promise<Result<DisciplineResponse>> {
    const response = await this.disciplineServiceCreate.create(disciplineRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Discipline cadastrada com sucesso!',
      response,
      res.path,
      null,
    );
  }
}
