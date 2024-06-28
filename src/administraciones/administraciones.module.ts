import { Module } from '@nestjs/common';
import { AdministracionesService } from './administraciones.service';
import { AdministracionesController } from './administraciones.controller';

@Module({
  controllers: [AdministracionesController],
  providers: [AdministracionesService],
})
export class AdministracionesModule {}
