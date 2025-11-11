import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplineModule } from './discipline/discipline.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({


      })
    }),
    DisciplineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
