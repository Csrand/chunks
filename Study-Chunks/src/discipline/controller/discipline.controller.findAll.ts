import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { DisciplineServiceFindAll } from "../service/discipline.service.findAll";
import { ROUTE } from "src/commons/constants/url.sistema";
import type { Request } from 'express';
import { MessageSystem } from "src/commons/message/message.system";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";
import { Result } from "src/commons/message/message";

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerFindAll {
  constructor(private readonly disciplineServiceFindAll: DisciplineServiceFindAll){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.DISCIPLINE.LIST)
  async findAll(@Req() req: Request): Promise<Result<DisciplineResponseDto[]>> {
    const response = await this.disciplineServiceFindAll.findAll();

    return MessageSystem.showMessage(
      HttpStatus.OK,
      'Listagem de disciplinas!',
      response,
      req.path,
      null
    ) 
  }

}