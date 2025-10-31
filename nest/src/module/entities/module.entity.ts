import { BaseEntity } from '../../commons/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BD2_MODULES')
export class Bd2Module extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'MODULE_ID',
    type: 'number',
  })
  moduleId?: number;

  @Column({
    name: 'DISCIPLINE_ID',
    type: 'number',
  })
  disciplineId: number;

  @Column({
    name: 'TITLE',
    type: 'varchar2',
    length: 100,
  })
  title?: string = '';

  @Column({
    name: 'DESCRIPTION',
    type: 'varchar2',
    length: 250,
  })
  description?: string = '';

  @OneToMany(()=> Bd2Module, (bd2Module) => bd2Module.disciplineId)
  modules: Bd2Module[]

  constructor(data: Partial<Bd2Module> = {}) {
    super();
    Object.assign(this, data);
  }
}
