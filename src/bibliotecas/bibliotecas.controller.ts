import { Body, Controller, Post } from '@nestjs/common';
import { BibliotecasService } from './bibliotecas.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bibliotecas')
@Controller('bibliotecas')
export class BibliotecasController {
  constructor(private readonly bibliotecasService: BibliotecasService) {}

  @Post('createBiblioteca')
  create(@Body() createBibliotecaDto: CreateBibliotecaDto) {
    return this.bibliotecasService.create(createBibliotecaDto);
  }
}
