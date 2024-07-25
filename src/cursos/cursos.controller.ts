import { Body, Controller, Post } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/crear-curso.dto';
import { UpdateCursoDto } from './dto/actualizar-curso.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.CURSOS)
@Controller(EnumSecciones.CURSOS)
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post('createCurso')
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }
}
