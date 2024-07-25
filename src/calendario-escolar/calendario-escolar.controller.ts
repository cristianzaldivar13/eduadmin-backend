import { Body, Controller, Post } from '@nestjs/common';
import { CalendarioEscolarService } from './calendario-escolar.service';
import { CrearCalendarioEscolarDto } from './dto/crear-calendario-escolar.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.CALENDARIO)
@Controller(EnumSecciones.CALENDARIO)
export class CalendarioEscolarController {
  constructor(private readonly calendarioEscolarService: CalendarioEscolarService) {}

  @Post('crearCalendarioEscolar')
  crear(@Body() crearCalendarioEscolarDto: CrearCalendarioEscolarDto) {
    return this.calendarioEscolarService.crear(crearCalendarioEscolarDto);
  }
}
