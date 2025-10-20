import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('BD2_USERS')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('increment', {
        name: 'USER_ID',
        type: 'number',
    })
    idUser?: number;

    @Column({
        name: 'USERNAME',
        type: 'varchar',
        length: 50,
    })
    username?: string = '';

    @Column({
        name: 'EMAIL',
        type: 'varchar',
    })
    email?: string = '';

    @Column({
        name: 'PASSWORD_HASH',
        type: 'text',
    })
    password?: string = '';
}
