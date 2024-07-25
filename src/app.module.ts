import { Module } from '@nestjs/common';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ReportesModule } from './reportes/reportes.module';
import { FinanzasModule } from './finanzas/finanzas.module';
import { VisitantesModule } from './visitantes/visitantes.module';
import { FamiliaresModule } from './tutores/tutores.module';
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
import { EscuelasModule } from './escuelas/escuelas.module';
import { GruposModule } from './grupos/grupos.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { PaginacionService } from './utils/servicios/paginacion.service';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    MongoModule,
    NotificacionesModule,
    ReportesModule,
    FinanzasModule,
    VisitantesModule,
    FamiliaresModule,
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
    EscuelasModule,
    GruposModule,
    CalificacionesModule,
    MenusModule,
  ],
  controllers: [],
  providers: [PaginacionService,],
})
export class AppModule {}
