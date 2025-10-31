import { PartialType } from '@nestjs/mapped-types';
import { CreateSubModuleDto } from './create-sub-module.dto';

export class UpdateSubModuleDto extends PartialType(CreateSubModuleDto) {}
