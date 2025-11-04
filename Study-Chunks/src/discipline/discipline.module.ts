import { TypeOrmModule } from "@nestjs/typeorm";
import { DisciplineEntity } from "./entity/discipline.entity";
import { Module } from "@nestjs/common";
import { DisciplineControllerCreate } from "./controller/discipline.controller.create";
import { DisciplineServiceCreate } from "./service/discipline.service.create";
import { DisciplineControllerFindAll } from "./controller/discipline.controller.findAll";
import { DisciplineServiceFindAll } from "./service/discipline.service.findAll";
import { DisciplineControllerDelete } from './controller/discipline.controller.delete';
import { DisciplineServiceDelete } from './service/discipline.service.delete';
import { DisciplineServiceUpdate } from './service/discipline.service.update';
import { DisciplineControllerUpdate } from './controller/discipline.controller.update';

const disciplineControllers = [
  DisciplineControllerCreate,
  DisciplineControllerFindAll,
  DisciplineControllerDelete,
  DisciplineControllerUpdate
];

const disciplineServices = [
  DisciplineServiceCreate,
  DisciplineServiceFindAll,
  DisciplineServiceDelete,
  DisciplineServiceUpdate
];

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEntity])],
  controllers: [...disciplineControllers],
  providers: [...disciplineServices],
  exports: [TypeOrmModule, ...disciplineServices],
})
export class DisciplineModule {}
