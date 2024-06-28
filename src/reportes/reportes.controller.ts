import { Body, Controller, Post } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';

@Controller()
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post('createReporte')
  create(@Body() createReporteDto: CreateReporteDto) {
    return this.reportesService.create(createReporteDto);
  }
}
