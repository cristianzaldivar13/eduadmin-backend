import { PartialType } from '@nestjs/mapped-types';
import { CrearTutoresDto } from './crear-tutores.dto';

export class ActualizarTutoresDto extends PartialType(CrearTutoresDto) {
  id: number;
}
