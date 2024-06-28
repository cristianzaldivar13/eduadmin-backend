import { Body, Controller, Post } from '@nestjs/common';
import { CursosAsignaturasService } from './cursos-asignaturas.service';
import { CreateCursosAsignaturaDto } from './dto/create-cursos-asignatura.dto';

@Controller()
export class CursosAsignaturasController {
  constructor(private readonly cursosAsignaturasService: CursosAsignaturasService) {}

  @Post('createCursosAsignatura')
  create(@Body() createCursosAsignaturaDto: CreateCursosAsignaturaDto) {
    return this.cursosAsignaturasService.create(createCursosAsignaturaDto);
  }
}
