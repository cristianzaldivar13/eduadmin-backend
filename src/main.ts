import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path'; // Añadir esta línea si no está importada
import { ConvierteIdEnObjectIdGuard } from './auth/guardians/convierte-id-en-objectid.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

    // Aplicar el guard globalmente
    app.useGlobalGuards(new ConvierteIdEnObjectIdGuard());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API ZAMSOFT')
    .setDescription('Documentación API')
    .setVersion('1.0.0')
    .addTag('Administraciones')
    .addTag('Asignaturas')
    .addTag('Asistencias')
    .addTag('Bibliotecas')
    .addTag('Calendario Escolar')
    .addTag('Comunicaciones')
    .addTag('Cursos')
    .addTag('Estudiantes')
    .addTag('Eventos')
    .addTag('Finanzas')
    .addTag('Notificaciones')
    .addTag('Profesores')
    .addTag('Reportes')
    .addTag('Roles')
    .addTag('Tutores')
    .addTag('Usuarios')
    .addTag('Visitantes')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3001);

  // Obtener la ruta completa a los certificados
  const certPath = path.resolve(__dirname, './certificados');
  const privateKeyPath = path.join(certPath, 'private-key.pem');
  const certificatePath = path.join(certPath, 'certificate.pem');

  // Configurar servidor HTTPS
  const httpsOptions = {
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(certificatePath),
  };

  const httpsServer = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await httpsServer.listen(3002);
}

bootstrap();
