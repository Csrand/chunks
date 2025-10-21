import {
  Controller,
  Delete,
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
import { DisciplineServiceRemove } from '../service/discipline.service.remove';

@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerRemove {
  constructor(private readonly disciplineServiceRemove: DisciplineServiceRemove) {}

  @HttpCode(HttpStatus.OK) //NO_CONTENT
  @Delete(ROTA.DISCIPLINE.DELETE)
  async remove(
    @Req() res: Request,
    @Param('disciplineID', ParseIntPipe) disciplineID: number,
  ): Promise<Result<void>> {
    await this.disciplineServiceRemove.remove(disciplineID);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina excluída com sucesso!',
      null,
      res.path,
      null,
    );
  }
}
