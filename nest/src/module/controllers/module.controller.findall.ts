import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { Bd2ModuleResponse } from '../dto/response.module';
import { Bd2ModuleServiceFindAll } from '../service/module.service.findall';

@Controller(ROTA.BD2MODULE.BASE)
export class Bd2ModuleControllerFindAll {
  constructor(private readonly bd2ModuleServiceFindAll: Bd2ModuleServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.BD2MODULE.LIST)
  async findAll(@Req() req: Request): Promise<Result<Bd2ModuleResponse[]>> {
    const response = await this.bd2ModuleServiceFindAll.findAll();
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de disciplinas gerada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
