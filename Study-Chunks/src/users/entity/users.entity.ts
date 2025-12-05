import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { UserProgressEntity } from '../../userProgress/entity/userProgress.entity';
import { AnswersEntity } from '../../answers/entity/answers.entity';
import { BadgesEntity } from '../../badges/entity/badges.entity';

@Entity({ name: 'BD2_Users' })
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'USER_ID' })
  userId!: number;

  @Column({ name: 'USERNAME', type: 'varchar', length: 50, unique: true })
  username!: string;

  @Column({ name: 'EMAIL', type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ name: 'PASSWORD_HASH', type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ name: 'FAILED_LOGIN_ATTEMPTS', type: 'number', default: 0 })
  failedLoginAttempts!: number;

  // Relations
  @OneToMany(() => UserProgressEntity, (userProgress) => userProgress.user)
  userProgresses!: UserProgressEntity[];

  @OneToMany(() => AnswersEntity, (answer) => answer.user)
  answers!: AnswersEntity[];

  @OneToMany(() => BadgesEntity, (badge) => badge.user)
  badges!: BadgesEntity[];

  constructor(data: Partial<UsersEntity> = {}) {
    super(data);
    Object.assign(this, data);
  }
}