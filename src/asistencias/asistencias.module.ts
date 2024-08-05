import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciaSchema } from './schemas/asistencia.schema';
import { Asistencia } from './models/asistencia.model';
import { ValidacionUsuarioGuard } from '../utils/validacion-usuario.guard.ts';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ConsultasService } from '../utils/servicios/consultas.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaAsistenciasMiddleware } from '../auth/middlewares/valida-asistencias.middleware';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema },
    ]),
    UsuariosModule,
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService, ValidacionUsuarioGuard, ConsultasService],
  exports: [AsistenciasService],
})
export class AsistenciasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaAsistenciasMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.ASISTENCIAS}/${EnumVerbos.CREAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASISTENCIAS}/${EnumVerbos.PAGINAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ASISTENCIAS}/${EnumVerbos.ACTUALIZAR}`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.ASISTENCIAS}/${EnumVerbos.CONSULTAR_POR_ID}`, method: RequestMethod.GET },
        { path: `${EnumSecciones.ASISTENCIAS}/${EnumVerbos.LISTAR}`, method: RequestMethod.GET },
      );
  }
}
