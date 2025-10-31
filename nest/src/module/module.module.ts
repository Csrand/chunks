import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bd2Module } from './entities/module.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Bd2Module])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
