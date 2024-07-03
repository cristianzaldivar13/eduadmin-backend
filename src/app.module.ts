import { Module } from '@nestjs/common';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ReportesModule } from './reportes/reportes.module';
import { FinanzasModule } from './finanzas/finanzas.module';
import { VisitantesModule } from './visitantes/visitantes.module';
import { FamiliaresModule } from './tutores/tutores.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { AdministracionesModule } from './administraciones/administraciones.module';
import { ComunicacionesModule } from './comunicaciones/comunicaciones.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { EventosModule } from './eventos/eventos.module';
import { BibliotecasModule } from './bibliotecas/bibliotecas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongoModule } from './utils/database/mongo.module';
import { RolesModule } from './roles/roles.module';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { CursosModule } from './cursos/cursos.module';
import { CalendarioEscolarModule } from './calendario-escolar/calendario-escolar.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongoModule,
    EstudiantesModule,
    NotificacionesModule,
    ReportesModule,
    FinanzasModule,
    VisitantesModule,
    FamiliaresModule,
    ProfesoresModule,
    AdministracionesModule,
    ComunicacionesModule,
    AsistenciasModule,
    EventosModule,
    BibliotecasModule,
    UsuariosModule,
    RolesModule,
    AsistenciasModule,
    AsignaturasModule,
    CursosModule,
    CalendarioEscolarModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
