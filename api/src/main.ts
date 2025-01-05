import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './config/data-source'; // Importa la conexión
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Conectar a la base de datos
  await AppDataSource.initialize()
    .then(() => {
      console.log('Base de datos conectada');
    })
    .catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
    });

  const app = await NestFactory.create(AppModule);

  // Configuración de GraphQL
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  await app.listen(3000);
  console.log('Servidor corriendo en el puerto 3000');
}

bootstrap();
