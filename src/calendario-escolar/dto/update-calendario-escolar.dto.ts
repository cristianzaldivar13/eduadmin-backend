import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarioEscolarDto } from './create-calendario-escolar.dto';

export class UpdateCalendarioEscolarDto extends PartialType(CreateCalendarioEscolarDto) {
  id: number;
}
