import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { SubmoduleEntity } from '../../submodule/entity/submodule.entity';
import { AnswersEntity } from '../../answers/entity/answers.entity';

@Entity({ name: 'BD2_Questions' })
export class QuestionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'QUESTION_ID' })
  questionId!: number;

  @Column({ name: 'SUBMODULE_ID', type: 'number' })
  submoduleId!: number;

  @Column({ name: 'QUESTION_TEXT', type: 'varchar', length: 1000 })
  questionText!: string;

  @Column({ name: 'OPTIONS', type: 'varchar', length: 2000, nullable: true })
  options!: string;

  @Column({ name: 'CORRECT_ANSWER', type: 'char', length: 1 })
  correctAnswer!: string;

  // Relations
  @ManyToOne(() => SubmoduleEntity, (submodule) => submodule.questions)
  @JoinColumn({ name: 'SUBMODULE_ID' })
  submodule!: SubmoduleEntity;

  @OneToMany(() => AnswersEntity, (answer) => answer.question)
  answers!: AnswersEntity[];

  constructor(data: Partial<QuestionsEntity> = {}) {
    super(data);
    Object.assign(this, data);
  }
}