import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
}
bootstrap();
