import { Body, Controller, Post } from '@nestjs/common';
import { VisitantesService } from './visitantes.service';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.VISITANTES)
@Controller(EnumSecciones.VISITANTES)
export class VisitantesController {
  constructor(private readonly visitantesService: VisitantesService) {}

  @Post('createVisitante')
  create(@Body() createVisitanteDto: CreateVisitanteDto) {
    return this.visitantesService.create(createVisitanteDto);
  }
}
