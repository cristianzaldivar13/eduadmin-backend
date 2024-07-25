import { Body, Controller, Post } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CrearReporteDto } from './dto/crear-reporte.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.REPORTES)
@Controller(EnumSecciones.REPORTES)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post('createReporte')
  create(@Body() crearReporteDto: CrearReporteDto) {
    return this.reportesService.create(crearReporteDto);
  }
}
