import { Body, Controller, Post } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/crear-evento.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.EVENTOS)
@Controller(EnumSecciones.EVENTOS)
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post('createEvento')
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }
}
