import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './entity/module.entity';
import { ModuleControllerCreate } from './controller/module.controller.create';
import { ModuleServiceCreate } from './service/module.service.create';
import { ModuleControllerFindAll } from './controller/module.controller.findAll';
import { ModuleServiceFindAll } from './service/module.service.findAll';
import { ModuleControllerFindOne } from './controller/module.controller.findOne';
import { ModuleServiceFindOne } from './service/module.service.findOne';
import { ModuleControllerUpdate } from './controller/module.controller.update';
import { ModuleServiceUpdate } from './service/module.service.update';
import { ModuleControllerDelete } from './controller/module.controller.delete';
import { ModuleServiceDelete } from './service/module.service.delete';

const moduleControllers = [
  ModuleControllerCreate,
  ModuleControllerFindAll,
  ModuleControllerFindOne,
  ModuleControllerUpdate,
  ModuleControllerDelete,
];
const moduleServices = [
  ModuleServiceCreate,
  ModuleServiceFindAll,
  ModuleServiceFindOne,
  ModuleServiceUpdate,
  ModuleServiceDelete,
];

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [...moduleControllers],
  providers: [...moduleServices],
  exports: [TypeOrmModule, ...moduleServices],
})
export class ModulesModule {}
