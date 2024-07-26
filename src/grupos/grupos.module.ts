import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grupo } from './models/grupo.model';
import { GrupoSchema } from './schemas/grupo.schema';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaGruposMiddleware } from '../auth/middlewares/valida-grupos.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
  ],
  controllers: [GruposController],
  providers: [GruposService],
  exports: [GruposService],
})
export class GruposModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaGruposMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.GRUPOS}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.GRUPOS}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.GRUPOS}/Actualizar`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.GRUPOS}/Obtener`, method: RequestMethod.GET },
      );
  }
}
