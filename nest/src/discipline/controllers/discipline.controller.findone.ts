import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { DisciplineServiceFindOne } from '../service/discipline.service.findone';
@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerFindOne {
  constructor(private readonly disciplineServiceFindOne: DisciplineServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.DISCIPLINE.BY_ID)
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<DisciplineResponse>> {
    const response = await this.disciplineServiceFindOne.findOne(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Discipline localizada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
