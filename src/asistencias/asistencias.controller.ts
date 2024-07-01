// asistencias.controller.ts

import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CrearAsistenciaDto } from './dto/create-asistencia.dto';
import { ValidacionUsuarioGuard } from '../utils/usuario-existe.guard.ts'; // Asegúrate de importar el guardia correcto

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post('CrearAsistencia')
  @UseGuards(ValidacionUsuarioGuard)
  async crear(@Body() crearAsistenciaDto: CrearAsistenciaDto) {
    return await this.asistenciasService.crearAsistencia(crearAsistenciaDto);
  }

  @Get()
  async obtenerTodas() {
    return await this.asistenciasService.obtenerAsistencias();
  }
}
