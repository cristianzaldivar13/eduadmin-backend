import { Body, Controller, Post } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CrearEstudianteDto } from './dto/create-estudiante.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.ESTUDIANTES)
@Controller(EnumSecciones.ESTUDIANTES)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post('crearEstudiante')
  crearEstudiante(@Body() crearEstudianteDto: CrearEstudianteDto) {
    return this.estudiantesService.crearEstudiante(crearEstudianteDto);
  }
}
