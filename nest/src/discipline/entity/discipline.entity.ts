import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('DISCIPLINES')
export class Discipline extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'DISCIPLINE_ID',
    type: 'number',
  })
  disciplineID?: number;

  @Column({
    name: 'NAME',
    type: 'varchar2',
    length: 20,
  })
  name?: string = '';

  @Column({
    name: 'DESCRIPTION',
    type: 'varchar2',
    length: 70,
  })
  description?: string = '';

  constructor(data: Partial<Discipline> = {}) {
    super();
    Object.assign(this, data);
  }
}
