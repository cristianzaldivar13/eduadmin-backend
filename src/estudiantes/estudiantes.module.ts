import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EstudianteSchema } from './schemas/estudiante.schema';
import { Estudiante } from './models/estudiante.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Estudiante.name, schema: EstudianteSchema },
    ]),
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService],
})
export class EstudiantesModule {}
