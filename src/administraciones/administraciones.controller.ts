import { Body, Controller, Post } from '@nestjs/common';
import { AdministracionesService } from './administraciones.service';
import { CreateAdministracioneDto } from './dto/create-administracione.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Administraciones')
@Controller()
export class AdministracionesController {
  constructor(private readonly administracionesService: AdministracionesService) {}

  @Post('createAdministracione')
  create(@Body() createAdministracioneDto: CreateAdministracioneDto) {
    return this.administracionesService.create(createAdministracioneDto);
  }
}
