import { Body, Controller, Post } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacioneDto } from './dto/crear-notificacione.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.NOTIFICACIONES)
@Controller(EnumSecciones.NOTIFICACIONES)
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post('createNotificacione')
  create(@Body() createNotificacioneDto: CreateNotificacioneDto) {
    return this.notificacionesService.create(createNotificacioneDto);
  }
}
