import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './commons/constants/constants.sistema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? PORT);
}
void bootstrap();
