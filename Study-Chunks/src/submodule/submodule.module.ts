import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmoduleEntity } from './entity/submodule.entity';
import { SubmoduleControllerCreate } from './controller/submodule.controller.create';
import { SubmoduleControllerDelete } from './controller/submodule.controller.delete';
import { SubmoduleControllerFindAll } from './controller/submodule.controller.findAll';
import { SubmoduleControllerFindOne } from './controller/submodule.controller.findOne';
import { SubmoduleControllerUpdate } from './controller/submodule.controller.update';
import { SubmoduleServiceCreate } from './service/submodule.service.create';
import { SubmoduleServiceDelete } from './service/submodule.service.delete';
import { SubmoduleServiceFindAll } from './service/submodule.service.findAll';
import { SubmoduleServiceFindOne } from './service/submodule.service.findOne';
import { SubmoduleServiceUpdate } from './service/submodule.service.update';

const submoduleControllers = [
  SubmoduleControllerCreate,
  SubmoduleControllerDelete,
  SubmoduleControllerFindAll,
  SubmoduleControllerFindOne,
  SubmoduleControllerUpdate,
];

const submoduleServices = [
  SubmoduleServiceCreate,
  SubmoduleServiceDelete,
  SubmoduleServiceFindAll,
  SubmoduleServiceFindOne,
  SubmoduleServiceUpdate,
];

@Module({
  imports: [TypeOrmModule.forFeature([SubmoduleEntity])],
  controllers: [...submoduleControllers],
  providers: [...submoduleServices],
  exports: [TypeOrmModule, ...submoduleServices],
})
export class SubmoduleModule {}
