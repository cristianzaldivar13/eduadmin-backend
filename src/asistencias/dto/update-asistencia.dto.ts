import { PartialType } from '@nestjs/mapped-types';
import { CrearAsistenciaDto } from './create-asistencia.dto';

export class UpdateAsistenciaDto extends PartialType(CrearAsistenciaDto) {
  id: number;
}
