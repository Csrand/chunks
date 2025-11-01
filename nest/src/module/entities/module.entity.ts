import { Discipline } from 'src/discipline/entity/discipline.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BD2_MODULES')
export class Bd2Module {
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
  title: string;

  @Column({
    name: 'DESCRIPTION',
    type: 'varchar2',
    length: 250,
  })
  description?: string;

  @ManyToOne(()=> Discipline, (discipline) => discipline.modules, {onDelete: 'CASCADE'})
  @JoinColumn({name:'DISCIPLINE_ID'})
  discipline: Discipline

  constructor(data: Partial<Bd2Module> = {}) {
    Object.assign(this, data);
  }
}
