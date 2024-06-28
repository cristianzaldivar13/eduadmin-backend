import { Body, Controller, Post } from '@nestjs/common';
import { AdministracionesService } from './administraciones.service';
import { CreateAdministracioneDto } from './dto/create-administracione.dto';

@Controller()
export class AdministracionesController {
  constructor(private readonly administracionesService: AdministracionesService) {}

  @Post('createAdministracione')
  create(@Body() createAdministracioneDto: CreateAdministracioneDto) {
    return this.administracionesService.create(createAdministracioneDto);
  }
}
