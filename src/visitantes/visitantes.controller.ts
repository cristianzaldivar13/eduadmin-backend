import { Body, Controller, Post } from '@nestjs/common';
import { VisitantesService } from './visitantes.service';
import { CreateVisitanteDto } from './dto/create-visitante.dto';

@Controller()
export class VisitantesController {
  constructor(private readonly visitantesService: VisitantesService) {}

  @Post('createVisitante')
  create(@Body() createVisitanteDto: CreateVisitanteDto) {
    return this.visitantesService.create(createVisitanteDto);
  }
}
