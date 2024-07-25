import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacioneDto } from './crear-notificacione.dto';

export class UpdateNotificacioneDto extends PartialType(CreateNotificacioneDto) {
  id: number;
}
