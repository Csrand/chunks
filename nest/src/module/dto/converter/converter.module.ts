import { Bd2Module } from 'src/module/entities/module.entity';
import { Bd2ModuleRequest } from '../request.module';
import { Bd2ModuleResponse } from '../response.module';
import { plainToInstance } from 'class-transformer';
export class ConverterModulo{

    static toBd2Module(bd2moduleRequest: Bd2ModuleRequest){
        const bd2Module = new Bd2Module();
        if(bd2moduleRequest.disciplineId != null){
            bd2Module.disciplineId = bd2moduleRequest.disciplineId
        }
        bd2Module.title = bd2moduleRequest.title;
        bd2Module.description = bd2moduleRequest.description;

        return bd2Module;
    }

    static toBd2ModuleResponse(bd2Module: Bd2Module): Bd2ModuleResponse {
        return plainToInstance(Bd2ModuleResponse, bd2Module, {
            excludeExtraneousValues: true,
        });
    }

    static toListBd2ModuleResponse(bd2Module: Bd2Module[] = []): Bd2ModuleResponse[] {
        return plainToInstance(Bd2ModuleResponse, bd2Module, {
            excludeExtraneousValues: true,
        });
    }
}
