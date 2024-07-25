import { Body, Controller, Post } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CrearTutoresDto } from './dto/crear-tutores.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.TUTORES)
@Controller(EnumSecciones.TUTORES)
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post('createFamiliare')
  create(@Body() crearTutoresDto: CrearTutoresDto) {
    return this.tutoresService.create(crearTutoresDto);
  }
}
