import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt!: Date;

  constructor(data: Partial<BaseEntity> = {}) {
    Object.assign(this, data);
  }
}
