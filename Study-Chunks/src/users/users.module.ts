import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { UsersControllerCreate } from './controller/users.controller.create';
import { UsersControllerFindAll } from './controller/users.controller.findAll';
import { UsersControllerFindOne } from './controller/users.controller.findOne';
import { UsersControllerUpdate } from './controller/users.controller.update';
import { UsersControllerDelete } from './controller/users.controller.delete';
import { UsersServiceCreate } from './service/users.service.create';
import { UsersServiceFindAll } from './service/users.service.findAll';
import { UsersServiceFindOne } from './service/users.service.findOne';
import { UsersServiceUpdate } from './service/users.service.update';
import { UsersServiceDelete } from './service/users.service.delete';

const usersControllers = [
  UsersControllerCreate,
  UsersControllerFindAll,
  UsersControllerFindOne,
  UsersControllerUpdate,
  UsersControllerDelete,
];

const usersServices = [
  UsersServiceCreate,
  UsersServiceFindAll,
  UsersServiceFindOne,
  UsersServiceUpdate,
  UsersServiceDelete,
];

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [...usersControllers],
  providers: [...usersServices],
  exports: [TypeOrmModule, ...usersServices],
})
export class UsersModule {}