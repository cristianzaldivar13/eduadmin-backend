import { Body, Controller, Post } from '@nestjs/common';
import { ComunicacionesService } from './comunicaciones.service';
import { CreateComunicacioneDto } from './dto/create-comunicacione.dto';

@Controller()
export class ComunicacionesController {
  constructor(private readonly comunicacionesService: ComunicacionesService) {}

  @Post('createComunicacione')
  create(@Body() createComunicacioneDto: CreateComunicacioneDto) {
    return this.comunicacionesService.create(createComunicacioneDto);
  }
}
