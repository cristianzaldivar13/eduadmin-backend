import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciaSchema } from './schemas/asistencia.schema';
import { Asistencia } from './models/asistencia.model';
import { ValidacionUsuarioGuard } from '../utils/validacion-usuario.guard.ts';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaAsistenciasMiddleware } from '../auth/middlewares/valida-asistencias.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema },
    ]),
    UsuariosModule,
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService, ValidacionUsuarioGuard, PaginacionService],
  exports: [AsistenciasService],
})
export class AsistenciasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaAsistenciasMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.ASISTENCIAS}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASISTENCIAS}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASISTENCIAS}/Actualizar`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.ASISTENCIAS}/ConsultarPorId/:id`, method: RequestMethod.GET },
      );
  }
}
