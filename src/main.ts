import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permite solicitudes solo desde este origen
    methods: ['GET', 'POST', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API ZAMSOFT')
    .setDescription('Documentación API')
    .setVersion('1.0.0')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3001); // Solo HTTP para desarrollo

  // Si deseas utilizar HTTPS en desarrollo, descomenta y configura
  /*
  const certPath = path.resolve(__dirname, './certificados');
  const privateKeyPath = path.join(certPath, 'private-key.pem');
  const certificatePath = path.join(certPath, 'certificate.pem');

  const httpsOptions = {
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(certificatePath),
  };

  const httpsServer = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await httpsServer.listen(3002);
  */
}

bootstrap();
