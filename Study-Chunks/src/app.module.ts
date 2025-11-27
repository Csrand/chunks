import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { DisciplineModule } from './discipline/discipline.module';
import { ModulesModule } from './modules/modules.module';
import { SubmoduleModule } from './submodule/submodule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ORACLE_LIB_DIR: Joi.string().required(),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(1521),
        DB_USERNAME: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_AUTOLOADENTITIES: Joi.boolean().default(true),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
        DB_LOGGING: Joi.boolean().default(true),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        sid: configService.get('DB_DATABASE'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: configService.get('DB_AUTOLOADENTITIES'),
        synchronize: configService.get('DB_SYNCHRONIZE'),
        logging: ['query', 'error'],
      }),
    }),
    DisciplineModule,
    ModulesModule,
    SubmoduleModule,
  ],
})
export class AppModule {}
