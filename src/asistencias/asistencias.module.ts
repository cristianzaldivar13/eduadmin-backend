import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciaSchema } from './schemas/asistencia.schema';
import { Asistencia } from './models/asistencia.model';
import { ValidacionUsuarioGuard } from '../utils/usuario-existe.guard.ts';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asistencia.name, schema: AsistenciaSchema }]),
    UsuariosModule,
  ],
  controllers: [AsistenciasController],
  providers: [
    AsistenciasService
    , ValidacionUsuarioGuard
  ],
  exports: [AsistenciasService],
})
export class AsistenciasModule {}
