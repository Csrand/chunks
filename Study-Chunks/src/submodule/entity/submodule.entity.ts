import { ModuleEntity } from 'src/modules/entity/module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BD2_SUBMODULES')
export class SubmoduleEntity {
  @PrimaryGeneratedColumn('increment', { name: 'SUBMODULE_ID', type: 'number' })
  submoduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  @Column({ name: 'EXPLANATION', type: 'clob' })
  explanation: string;

  @ManyToOne(() => ModuleEntity, (module) => module.submodules)
  @JoinColumn({ name: 'MODULE_ID' })
  module: ModuleEntity;

  constructor(data: Partial<SubmoduleEntity> = {}) {
    Object.assign(this, data);
  }
}
