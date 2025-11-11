import { Module } from '@nestjs/common';
import { DisciplineService } from './services/discipline.service';
import { DisciplineController } from './controllers/discipline.controller';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService],
})
export class DisciplineModule {}
