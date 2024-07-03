import { Body, Controller, Post } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CrearTutoresDto } from './dto/create-tutores.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tutores')
@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post('createFamiliare')
  create(@Body() crearTutoresDto: CrearTutoresDto) {
    return this.tutoresService.create(crearTutoresDto);
  }
}
