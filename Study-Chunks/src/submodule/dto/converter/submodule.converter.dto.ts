import { plainToInstance } from 'class-transformer';
import { SubmoduleRequestDto } from '../request/submodule.request.dto';
import { SubmoduleEntity } from 'src/submodule/entity/submodule.entity';
import { SubmoduleResponseDto } from '../response/submodule.response.dto';
import { ModuleEntity } from 'src/modules/entity/module.entity';

export class SubmoduleConverterDto {
  static toSubmoduleEntity(submoduleRequest: SubmoduleRequestDto): SubmoduleEntity {
    const submoduleEntity = new SubmoduleEntity();

    if (submoduleRequest.submoduleId) {
      submoduleEntity.submoduleId = submoduleRequest.submoduleId;
    }
    submoduleEntity.title = submoduleRequest.title;
    submoduleEntity.explanation = submoduleRequest.explanation;

    const module = new ModuleEntity();
    module.moduleId = submoduleRequest.moduleId;
    submoduleEntity.module = module;

    return submoduleEntity;
  }

  static toSubmoduleResponse(submodule: SubmoduleEntity): SubmoduleResponseDto {
    return plainToInstance(SubmoduleResponseDto, submodule, {
      excludeExtraneousValues: true,
    });
  }

  static toListSubmoduleResponse(submodules: SubmoduleEntity[] = []): SubmoduleResponseDto[] {
    return plainToInstance(SubmoduleResponseDto, submodules, {
      excludeExtraneousValues: true,
    });
  }
}
