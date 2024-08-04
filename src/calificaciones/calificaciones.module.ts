import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calificacion } from './models/calificacion.model';
import { CalificacionSchema } from './schemas/calificacion.schema';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaCalificacionesMiddleware } from '../auth/middlewares/valida-calificaciones.middleware';
import { EnumVerbos } from '../utils/enums/verbos.enum';

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
        { path: `${EnumSecciones.CALIFICACIONES}/${EnumVerbos.CREAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.CALIFICACIONES}/${EnumVerbos.PAGINAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.CALIFICACIONES}/${EnumVerbos.ACTUALIZAR}`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.CALIFICACIONES}/${EnumVerbos.CONSULTAR_POR_ID}`, method: RequestMethod.GET },
        { path: `${EnumSecciones.CALIFICACIONES}/${EnumVerbos.LISTAR}`, method: RequestMethod.GET },
      );
  }
}
