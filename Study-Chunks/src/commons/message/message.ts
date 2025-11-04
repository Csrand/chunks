export interface Result<T> {
  status: number;
  timestamp: string;
  message?: string | null;
  error?: string | null | unknown;
  data?: T | null;
  path: string | null;
}

export class Message<T> {
  status: number = 0;
  message: string | null = null;
  error: string | unknown | null = null;
  data: T | null = null;
  path: string | null = null;

  constructor(
    status: number,
    message: string | null = null,
    data: T | null = null,
    path: string | null = null,
    error: string | unknown | null = null,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.path = path;
    this.error = error;
  }

  toJSON(): Result<T> {
    const result: Result<T> = {
      status: this.status,
      timestamp: new Date().toISOString().split('T')[0],
      path: this.path,
    };

    if (this.message !== null && this.message !== undefined) {
      result.message = this.message;
    }

    if (this.data !== null && this.data !== undefined) {
      result.data = this.data;
    }

    if (this.error !== null && this.error !== undefined) {
      result.error = this.error;
    }

    return result;
  }
}
