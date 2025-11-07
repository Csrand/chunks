import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService],
})
export class DisciplineModule {}
