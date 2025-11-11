import { Type } from 'class-transformer';
import { IsNotEmpty,  MaxLength } from 'class-validator';

export class DisciplineRequest {
    @Type(()=> Number)
    @IsNotEmpty({message: 'Código da cidade deve ser informado'})
    disciplineId: number;

    @Type(()=> String)
    @IsNotEmpty({message: 'O nome da disciplina deve ser informado'})
    @MaxLength(100, {
        message: 'O tamanho máximo para o nome da disciplina é de 100 caracteres.'
    })
    disciplineName: string;

    @Type(()=> String)
    @IsNotEmpty({message: 'A descrição da disciplina deve ser informada'})
    @MaxLength(200, {
        message: 'O tamanho máximo para a descrição da disciplina é de 200 caracteres.'
    })
    description: string;

    constructor(data: Partial<DisciplineRequest> ={}){
        Object.assign(this, data);
    }
}
