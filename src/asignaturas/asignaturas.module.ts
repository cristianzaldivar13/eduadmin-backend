import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { AsignaturasController } from './asignaturas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsignaturaSchema } from './schemas/asignatura.schema';
import { Asignatura } from './models/asignatura.model';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaAsignaturasMiddleware } from '../auth/middlewares/valida-asignaturas.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asignatura.name, schema: AsignaturaSchema },
    ]),
  ],
  controllers: [AsignaturasController],
  providers: [AsignaturasService, PaginacionService],
  exports: [AsignaturasService],
})
export class AsignaturasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaAsignaturasMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.ASIGNATURAS}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASIGNATURAS}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASIGNATURAS}/Actualizar`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.ASIGNATURAS}/Obtener`, method: RequestMethod.GET },
      );
  }
}
