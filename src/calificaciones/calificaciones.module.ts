import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calificacion } from './models/calificacion.model';
import { CalificacionSchema } from './schemas/calificacion.schema';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaCalificacionesMiddleware } from '../auth/middlewares/valida-calificaciones.middleware';

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
export class CalificacionesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaCalificacionesMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.CALIFICACIONES}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.CALIFICACIONES}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.CALIFICACIONES}/Actualizar`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.CALIFICACIONES}/ConsultarPorId/:id`, method: RequestMethod.GET },
      );
  }
}
