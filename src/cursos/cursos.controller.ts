import { Body, Controller, Post } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller()
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post('createCurso')
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }
}
