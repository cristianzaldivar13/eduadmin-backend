import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { CrearAsignaturaDto } from './dto/create-asignatura.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.ASIGNATURAS)
@Controller(EnumSecciones.ASIGNATURAS)
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Post('CrearAsignatura')
  crear(@Body() crearAsignaturaDto: CrearAsignaturaDto) {
    return this.asignaturasService.crear(crearAsignaturaDto);
  }

  @Get('obtenerPorId/:id')
  obtenerPorId(@Param('id') id: string) {
    return this.asignaturasService.obtenerPorId(id);
  }

  @Get('obtener')
  obtener() {
    return this.asignaturasService.obtener();
  }
}
