import { Response } from 'express';
import { MessageSystem } from './message.system';

export function sendHttpResponse<T>(
  res: Response,
  status: number,
  message: string | null,
  data: T | null,
  path: string | null,
  error: string | any | null,
) {
  return res
    .status(status)
    .json(MessageSystem.showMessage(status, message, data, path, error));
}
