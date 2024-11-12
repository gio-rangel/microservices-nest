import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(`Bootstrap Client Gateway`);

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  const app = await NestFactory.create(AppModule);
  

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       
      forbidNonWhitelisted: true, 
      transform: true,     
    }),
  );

  logger.debug(`App running at ${host}:${port}`)

  await app.listen(port, host);
}
bootstrap();
