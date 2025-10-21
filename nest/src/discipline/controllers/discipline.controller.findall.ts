import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { DisciplineResponse } from '../dto/response/discipline.response';
import { DisciplineServiceFindAll } from '../service/discipline.service.findall';

@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerFindAll {
  constructor(private readonly disciplineServiceFindAll: DisciplineServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.DISCIPLINE.LIST)
  async findAll(@Req() req: Request): Promise<Result<DisciplineResponse[]>> {
    const response = await this.disciplineServiceFindAll.findAll();
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de disciplinas gerada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
