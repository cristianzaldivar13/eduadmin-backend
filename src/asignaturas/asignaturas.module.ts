import { Module } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { AsignaturasController } from './asignaturas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsignaturaSchema } from './schemas/asignatura.schema';
import { Asignatura } from './models/asignatura.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asignatura.name, schema: AsignaturaSchema },
    ]),
  ],
  controllers: [AsignaturasController],
  providers: [AsignaturasService],
  exports: [AsignaturasService],
})
export class AsignaturasModule {}
