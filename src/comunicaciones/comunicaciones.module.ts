import { Module } from '@nestjs/common';
import { ComunicacionesService } from './comunicaciones.service';
import { ComunicacionesController } from './comunicaciones.controller';

@Module({
  controllers: [ComunicacionesController],
  providers: [ComunicacionesService],
})
export class ComunicacionesModule {}
