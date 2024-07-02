import { Body, Controller, Post } from '@nestjs/common';
import { CalendarioEscolarService } from './calendario-escolar.service';
import { CrearCalendarioEscolarDto } from './dto/create-calendario-escolar.dto';

@Controller('calendario-escolar')
export class CalendarioEscolarController {
  constructor(private readonly calendarioEscolarService: CalendarioEscolarService) {}

  @Post('crearCalendarioEscolar')
  crearCalendarioEscolar(@Body() crearCalendarioEscolarDto: CrearCalendarioEscolarDto) {
    return this.calendarioEscolarService.crearCalendarioEscolar(crearCalendarioEscolarDto);
  }
}
