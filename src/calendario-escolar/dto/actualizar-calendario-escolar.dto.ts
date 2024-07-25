import { PartialType } from '@nestjs/mapped-types';
import { CrearCalendarioEscolarDto } from './crear-calendario-escolar.dto';

export class UpdateCalendarioEscolarDto extends PartialType(CrearCalendarioEscolarDto) {
  id: number;
}
