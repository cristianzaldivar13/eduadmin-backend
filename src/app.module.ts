import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ReportesModule } from './reportes/reportes.module';
import { FinanzasModule } from './finanzas/finanzas.module';
import { VisitantesModule } from './visitantes/visitantes.module';
import { FamiliaresModule } from './familiares/familiares.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { AdministracionesModule } from './administraciones/administraciones.module';
import { ComunicacionesModule } from './comunicaciones/comunicaciones.module';
import { CursosAsignaturasModule } from './cursos-asignaturas/cursos-asignaturas.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { EventosModule } from './eventos/eventos.module';
import { BibliotecasModule } from './bibliotecas/bibliotecas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongoModule } from './database/mongo.module';
import { RolesModule } from './roles/roles.module';

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
    CursosAsignaturasModule,
    AsistenciasModule,
    EventosModule,
    BibliotecasModule,
    UsuariosModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
