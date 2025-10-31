import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BD2_Module } from './entities/module.entity';
@Module({
  imports:[TypeOrmModule.forFeature([BD2_Module])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
