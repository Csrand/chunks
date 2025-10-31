import { BaseEntity } from '../../commons/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bd2Module } from 'src/module/entities/module.entity';

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

  @OneToMany(()=> Bd2Module, (bd2Module) => bd2Module.disciplineId)
  modules: Bd2Module[]

  constructor(data: Partial<Discipline> = {}) {
    super();
    Object.assign(this, data);
  }
}
