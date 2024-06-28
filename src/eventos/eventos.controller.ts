import { Body, Controller, Post } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller()
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post('createEvento')
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }
}
