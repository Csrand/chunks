import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './entity/discipline.entity';
import { DisciplineControllerCreate } from './controllers/discipline.controller.create';
import { DisciplineControllerFindAll } from './controllers/discipline.controller.findall';
import { DisciplineControllerFindOne } from './controllers/discipline.controller.findone';
import { DisciplineControllerRemove } from './controllers/discipline.controller.remove';
import { DisciplineControllerUpdate } from './controllers/discipline.controller.update';
import { DisciplineServiceCreate } from './service/discipline.service.create';
import { DisciplineServiceFindAll } from './service/discipline.service.findall';
import { DisciplineServiceFindOne } from './service/discipline.service.findone';
import { DisciplineServiceRemove } from './service/discipline.service.remove';
import { DisciplineServiceUpdate } from './service/discipline.service.update';

const disciplineControllers = [
  DisciplineControllerFindAll,
  DisciplineControllerFindOne,
  DisciplineControllerCreate,
  DisciplineControllerUpdate,
  DisciplineControllerRemove,
];

const disciplineServices = [
  DisciplineServiceCreate,
  DisciplineServiceUpdate,
  DisciplineServiceRemove,
  DisciplineServiceFindAll,
  DisciplineServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [...disciplineControllers],
  providers: [...disciplineServices],
  exports: [TypeOrmModule, ...disciplineServices],
})
export class DisciplineModule {}
