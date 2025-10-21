import { BaseEntity } from '../../commons/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BD2_DISCIPLINES')
export class Discipline extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'DISCIPLINE_ID',
    type: 'number',
  })
  disciplineID?: number;

  @Column({
    name: 'NAME',
    type: 'varchar2',
    length: 100,
  })
  name?: string = '';

  @Column({
    name: 'DESCRIPTION',
    type: 'varchar2',
    length: 250,
  })
  description?: string = '';

  constructor(data: Partial<Discipline> = {}) {
    super();
    Object.assign(this, data);
  }
}
