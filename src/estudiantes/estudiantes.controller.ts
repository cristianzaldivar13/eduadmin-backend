import { Body, Controller, Post } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller()
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post('createEstudiante')
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }
}
