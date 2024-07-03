import { PartialType } from '@nestjs/mapped-types';
import { CrearTutoresDto } from './create-tutores.dto';

export class ActualizarTutoresDto extends PartialType(CrearTutoresDto) {
  id: number;
}
