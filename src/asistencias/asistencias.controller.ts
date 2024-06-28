import { Body, Controller, Post } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Controller()
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post('createAsistencia')
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciasService.create(createAsistenciaDto);
  }
}
