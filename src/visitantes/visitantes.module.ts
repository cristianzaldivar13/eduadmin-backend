import { Module } from '@nestjs/common';
import { VisitantesService } from './visitantes.service';
import { VisitantesController } from './visitantes.controller';

@Module({
  controllers: [VisitantesController],
  providers: [VisitantesService],
})
export class VisitantesModule {}
