import { PartialType } from '@nestjs/mapped-types';
import { CreateFinanzaDto } from './crear-finanza.dto';

export class UpdateFinanzaDto extends PartialType(CreateFinanzaDto) {
  id: number;
}
