import { Body, Controller, Post } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.ESTUDIANTES)
@Controller(EnumSecciones.ESTUDIANTES)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post('createEstudiante')
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }
}
