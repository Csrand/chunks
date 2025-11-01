import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bd2Module } from './entities/module.entity';
import { Bd2ModuleControllerCreate } from './controllers/module.controller.create';
import { Bd2ModuleControllerFindAll } from './controllers/module.controller.findall';
import { Bd2ModuleControllerFindOne } from './controllers/module.controller.findone';
import { Bd2ModuleServiceCreate } from './service/module.service.create';
import { Bd2ModuleServiceFindAll } from './service/module.service.findall';
import { Bd2ModuleServiceFindOne } from './service/module.service.findone';


const bd2ModuleControllers = [
  Bd2ModuleControllerCreate,
  Bd2ModuleControllerFindAll,
  Bd2ModuleControllerFindOne,
];

const bd2ModuleServices = [
  Bd2ModuleServiceCreate,
  Bd2ModuleServiceFindAll,
  Bd2ModuleServiceFindOne,
];

@Module({
  imports:[TypeOrmModule.forFeature([Bd2Module])],
  controllers: [... bd2ModuleControllers],
  providers: [... bd2ModuleServices],
})
export class Bd2ModuleModule {}
