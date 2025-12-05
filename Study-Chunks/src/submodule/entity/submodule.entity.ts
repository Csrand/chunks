import { ModuleEntity } from 'src/modules/entity/module.entity';
import { BaseEntity } from '../../commons/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionsEntity } from '../../questions/entity/questions.entity';

@Entity('BD2_SUBMODULES')
export class SubmoduleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'SUBMODULE_ID', type: 'number' })
  submoduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  @Column({ name: 'EXPLANATION', type: 'clob' })
  explanation: string;

  @ManyToOne(() => ModuleEntity, (module) => module.submodules)
  @JoinColumn({ name: 'MODULE_ID' })
  module: ModuleEntity;

  @OneToMany(() => QuestionsEntity, (question) => question.submodule)
  questions!: QuestionsEntity[];

  constructor(data: Partial<SubmoduleEntity> = {}) {
    super(data);
    Object.assign(this, data);
  }
}
