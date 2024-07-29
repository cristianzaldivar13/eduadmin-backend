import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grupo } from './models/grupo.model';
import { GrupoSchema } from './schemas/grupo.schema';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaGruposMiddleware } from '../auth/middlewares/valida-grupos.middleware';
import { PaginacionService } from '../utils/servicios/paginacion.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
  ],
  controllers: [GruposController],
  providers: [GruposService, PaginacionService],
  exports: [GruposService],
})
export class GruposModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaGruposMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.GRUPOS}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.GRUPOS}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.GRUPOS}/Actualizar/:id`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.GRUPOS}/ConsultarPorId/:id`, method: RequestMethod.GET },
      );
  }
}
