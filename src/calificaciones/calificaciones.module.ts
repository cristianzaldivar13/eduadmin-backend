import { Module } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calificacion } from './models/calificacion.model';
import { CalificacionSchema } from './schemas/calificacion.schema';
import { PaginacionService } from '../utils/servicios/paginacion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calificacion.name, schema: CalificacionSchema },
    ]),
  ],
  controllers: [CalificacionesController],
  providers: [CalificacionesService, PaginacionService],
  exports: [CalificacionesService],
})
export class CalificacionesModule {}
