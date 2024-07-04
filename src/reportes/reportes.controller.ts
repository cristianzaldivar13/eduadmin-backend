import { Body, Controller, Post } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.REPORTES)
@Controller(EnumSecciones.REPORTES)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post('createReporte')
  create(@Body() createReporteDto: CreateReporteDto) {
    return this.reportesService.create(createReporteDto);
  }
}
