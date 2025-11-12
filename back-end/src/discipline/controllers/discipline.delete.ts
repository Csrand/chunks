import { DisciplineServiceDelete } from '../services/discipline.delete';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ROTA } from '../../commons/constants/url.sistema';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import type { Request } from 'express';
import { Result } from 'src/commons/mensagem/message';

@Controller(ROTA.DISCIPLINE.BASE)
export class DisciplineControllerDelete {
  constructor(private readonly disciplineServiceDelete: DisciplineServiceDelete) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(ROTA.DISCIPLINE.DELETE)
  async delete(
    @Req() req: Request,
    @Param('disciplineId', ParseIntPipe) disciplineId: number,
  ): Promise<Result<void>> {
    const response = await this.disciplineServiceDelete.delete(disciplineId);

    return MensagemSistema.showMensagem(
      HttpStatus.NO_CONTENT,
      'Disciplina removida com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
