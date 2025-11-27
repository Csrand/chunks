import { plainToInstance } from 'class-transformer';
import { ModuleRequestDto } from '../request/module.request.dto';
import { ModuleEntity } from 'src/modules/entity/module.entity';
import { ModuleResponseDto } from '../response/module.response.dto';
import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';

export class ModuleConverterDto {
  static toModuleEntity(moduleRequest: ModuleRequestDto): ModuleEntity {
    const moduleEntity = new ModuleEntity();

    if (moduleRequest.moduleId) {
      moduleEntity.moduleId = moduleRequest.moduleId;
    }
    moduleEntity.title = moduleRequest.title;
    moduleEntity.description = moduleRequest.description;

    const discipline = new DisciplineEntity();
    discipline.disciplineId = moduleRequest.disciplineId;
    moduleEntity.discipline = discipline;

    return moduleEntity;
  }

  static toModuleResponse(module: ModuleEntity): ModuleResponseDto {
    return plainToInstance(ModuleResponseDto, module, {
      excludeExtraneousValues: true,
    });
  }

  static toListModuleResponse(modules: ModuleEntity[] = []): ModuleResponseDto[] {
    return plainToInstance(ModuleResponseDto, modules, {
      excludeExtraneousValues: true,
    });
  }
}
