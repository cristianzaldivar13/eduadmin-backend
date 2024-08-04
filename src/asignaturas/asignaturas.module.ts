import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { AsignaturasController } from './asignaturas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsignaturaSchema } from './schemas/asignatura.schema';
import { Asignatura } from './models/asignatura.model';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaAsignaturasMiddleware } from '../auth/middlewares/valida-asignaturas.middleware';
import { EnumVerbos } from '../utils/enums/verbos.enum';

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
        { path: `${EnumSecciones.ASIGNATURAS}/${EnumVerbos.CREAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASIGNATURAS}/${EnumVerbos.PAGINAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASIGNATURAS}/${EnumVerbos.ACTUALIZAR}`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.ASIGNATURAS}/${EnumVerbos.CONSULTAR_POR_ID}`, method: RequestMethod.GET },
        { path: `${EnumSecciones.ASIGNATURAS}/${EnumVerbos.LISTAR}`, method: RequestMethod.GET },
      );
  }
}
