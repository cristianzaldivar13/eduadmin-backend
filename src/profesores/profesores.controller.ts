import { Body, Controller, Post } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesoreDto } from './dto/create-profesore.dto';

@Controller()
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post('createProfesore')
  create(@Body() createProfesoreDto: CreateProfesoreDto) {
    return this.profesoresService.create(createProfesoreDto);
  }
}
