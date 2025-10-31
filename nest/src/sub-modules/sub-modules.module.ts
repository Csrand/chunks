import { Module } from '@nestjs/common';
import { SubModulesService } from './sub-modules.service';
import { SubModulesController } from './sub-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubModule } from './entities/sub-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubModule])],
  controllers: [SubModulesController],
  providers: [SubModulesService],
})
export class SubModulesModule {}
