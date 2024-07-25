import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './crear-evento.dto';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
  id: number;
}
