import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';
import { SubmoduleEntity } from 'src/submodule/entity/submodule.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BD2_MODULES')
export class ModuleEntity {
  @PrimaryGeneratedColumn('increment', { name: 'MODULE_ID', type: 'number' })
  moduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  @Column({ name: 'DESCRIPTION', type: 'clob' })
  description: string;

  @ManyToOne(() => DisciplineEntity, (discipline) => discipline.modules)
  @JoinColumn({ name: 'DISCIPLINE_ID' })
  discipline: DisciplineEntity;

  @OneToMany(() => SubmoduleEntity, (submodule) => submodule.module)
  submodules: SubmoduleEntity[];

  constructor(data: Partial<ModuleEntity> = {}) {
    Object.assign(this, data);
  }
}
