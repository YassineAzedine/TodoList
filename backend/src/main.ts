import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Retire les propriétés qui ne sont pas spécifiées dans le DTO
    forbidNonWhitelisted: true, // Lance une erreur si des propriétés non spécifiées sont présentes
    transform: true, // Transforme les objets en instances de classes
  }));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(4040);
}
bootstrap();
