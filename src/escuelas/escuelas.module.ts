import { Module } from '@nestjs/common';
import { EscuelasService } from './escuelas.service';
import { EscuelasController } from './escuelas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Escuelas } from './models/escuela.model';
import { EscuelaSchema } from './schemas/escuela.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Escuelas.name, schema: EscuelaSchema }]),
  ],
  controllers: [EscuelasController],
  providers: [EscuelasService],
  exports: [EscuelasService],
})
export class EscuelasModule {}
