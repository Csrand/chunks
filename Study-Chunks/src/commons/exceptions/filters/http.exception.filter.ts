import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sendHttpResponse } from '../../message/send.response';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;
    const erro = exception.cause;

    return sendHttpResponse(res, status, message, null, req.path, erro);
  }
}
