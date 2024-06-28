import { Module } from '@nestjs/common';
import { BibliotecasService } from './bibliotecas.service';
import { BibliotecasController } from './bibliotecas.controller';

@Module({
  controllers: [BibliotecasController],
  providers: [BibliotecasService],
})
export class BibliotecasModule {}
