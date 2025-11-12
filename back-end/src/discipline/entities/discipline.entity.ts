import { BaseEntity } from 'src/commons/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BD2_DISCIPLINES')
export class Discipline extends BaseEntity{
    @PrimaryGeneratedColumn('increment', {
        name: 'DISCIPLINE_ID',
        type: 'number',
    })
    disciplineId: number;

    @Column({
        name: 'NAME',
        type: 'varchar2',
    })
    disciplineName: string;

    @Column({
        name: 'DESCRIPTION',
        type: 'text',
    })
    description: string;

    constructor(data: Partial<Discipline> = {}){
        super();
        Object.assign(this, data);
    }
}
