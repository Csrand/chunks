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
import { Bd2ModuleResponse } from '../dto/response.module';
import { Bd2ModuleServiceFindOne } from '../service/module.service.findone';

@Controller(ROTA.BD2MODULE.BASE)
export class Bd2ModuleControllerFindOne {
  constructor(private readonly bd2ModuleServiceFindOne: Bd2ModuleServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.BD2MODULE.BY_ID)
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<Bd2ModuleResponse>> {
    const response = await this.bd2ModuleServiceFindOne.findOne(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina localizada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
