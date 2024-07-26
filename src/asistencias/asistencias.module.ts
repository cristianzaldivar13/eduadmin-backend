import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciaSchema } from './schemas/asistencia.schema';
import { Asistencia } from './models/asistencia.model';
import { ValidacionUsuarioGuard } from '../utils/validacion-usuario.guard.ts';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PaginacionService } from '../utils/servicios/paginacion.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asistencia.name, schema: AsistenciaSchema }]),
    UsuariosModule,
  ],
  controllers: [AsistenciasController],
  providers: [
    AsistenciasService
    , ValidacionUsuarioGuard
    , PaginacionService
  ],
  exports: [AsistenciasService],
})
export class AsistenciasModule {}
