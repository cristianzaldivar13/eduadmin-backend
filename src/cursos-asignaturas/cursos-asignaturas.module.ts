import { Module } from '@nestjs/common';
import { CursosAsignaturasService } from './cursos-asignaturas.service';
import { CursosAsignaturasController } from './cursos-asignaturas.controller';

@Module({
  controllers: [CursosAsignaturasController],
  providers: [CursosAsignaturasService],
})
export class CursosAsignaturasModule {}
