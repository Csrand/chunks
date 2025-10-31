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
import { Bd2ModuleRequest } from '../dto/request.module';
import { Bd2ModuleResponse } from '../dto/response.module';
import { Bd2ModuleServiceCreate } from '../service/module.service.create';

@Controller(ROTA.BD2MODULE.BASE)
export class Bd2ModuleControllerCreate {
    constructor(private readonly bd2ServiceCreate: Bd2ModuleServiceCreate) {}

    @HttpCode(HttpStatus.CREATED)
    @Post(ROTA.BD2MODULE.CREATE)
    async create(
        @Req() res: Request,
        @Body() bd2ModuleRequest: Bd2ModuleRequest,
    ): Promise<Result<Bd2ModuleResponse>> {
        const response = await this.bd2ServiceCreate.create(bd2ModuleRequest);
        return MensagemSistema.showMensagem(
            HttpStatus.CREATED,
            'Modulo cadastrado com sucesso!',
            response,
            res.path,
            null,
        );
    }
}
