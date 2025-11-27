import { Injectable } from '@nestjs/common';
import { Message, Result } from './message';

@Injectable()
export class MessageSystem {
  static showMessage<T>(
    status: number,
    message: string | null,
    data: T | null,
    path: string | null,
    error: string | null,
  ): Result<T> {
    const response = new Message(status, message, data, path, error);
    return response.toJSON();
  }
}
