import { PartialType } from '@nestjs/mapped-types';
import { CreateComunicacioneDto } from './create-comunicacione.dto';

export class UpdateComunicacioneDto extends PartialType(CreateComunicacioneDto) {
  id: number;
}
