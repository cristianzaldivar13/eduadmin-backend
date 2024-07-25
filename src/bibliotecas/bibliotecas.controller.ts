import { Body, Controller, Post } from '@nestjs/common';
import { BibliotecasService } from './bibliotecas.service';
import { CreateBibliotecaDto } from './dto/crear-biblioteca.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.BIBLIOTECAS)
@Controller(EnumSecciones.BIBLIOTECAS)
export class BibliotecasController {
  constructor(private readonly bibliotecasService: BibliotecasService) {}

  @Post('createBiblioteca')
  create(@Body() createBibliotecaDto: CreateBibliotecaDto) {
    return this.bibliotecasService.create(createBibliotecaDto);
  }
}
