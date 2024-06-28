import { Body, Controller, Post } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';

@Controller()
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post('createNotificacione')
  create(@Body() createNotificacioneDto: CreateNotificacioneDto) {
    return this.notificacionesService.create(createNotificacioneDto);
  }
}
