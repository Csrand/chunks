import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as oracledb from 'oracledb';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa o cliente Oracle em modo Thick antes da aplicação Nest iniciar
const oracleLibDir = process.env.ORACLE_LIB_DIR;
if (oracleLibDir) {
  try {
    oracledb.initOracleClient({ libDir: oracleLibDir });
  } catch (err) {
    console.error('Erro ao inicializar o cliente Oracle:', err);
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
