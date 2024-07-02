import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { CrearAsignaturaDto } from './dto/create-asignatura.dto';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Post('CrearAsignatura')
  crearAsignatura(@Body() crearAsignaturaDto: CrearAsignaturaDto) {
    return this.asignaturasService.crearAsignatura(crearAsignaturaDto);
  }

  @Get('obtenerAsignaturaPorId/:id')
  obtenerAsignaturaPorId(@Param('id') id: string) {
    return this.asignaturasService.obtenerAsignaturaPorId(id);
  }

  @Get('obtenerAsignaturas')
  obtenerAsignaturas() {
    return this.asignaturasService.obtenerAsignaturas();
  }
}
