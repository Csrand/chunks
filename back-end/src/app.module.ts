import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplineModule } from './discipline/discipline.module';

@Module({
  imports: [DisciplineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
