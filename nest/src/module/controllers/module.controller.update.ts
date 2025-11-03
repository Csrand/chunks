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
import { Bd2ModuleServiceUpdate } from '../service/module.service.update';
import { Bd2ModuleRequest } from '../dto/request.module';
import { Bd2ModuleResponse } from '../dto/response.module';

@Controller(ROTA.BD2MODULE.BASE)
export class Bd2moduleControllerUpdate {
  constructor(private readonly bd2moduleServiceUpdate: Bd2ModuleServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.BD2MODULE.UPDATE)
  async update(
    @Req() res: Request,
    @Param('id', ParseIntPipe) bd2moduleID: number,
    @Body() bd2moduleRequest: Bd2ModuleRequest,
  ): Promise<Result<Bd2ModuleResponse>> {
    const response = await this.bd2moduleServiceUpdate.update(bd2moduleID, bd2moduleRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Modulo alterado com sucesso !',
      response,
      res.path,
      null,
    );
  }
}
