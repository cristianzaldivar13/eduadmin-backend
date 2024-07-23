import { PartialType } from '@nestjs/mapped-types';
import { CrearAsistenciaDto } from './create-asistencia.dto';

export class ActualizarAsistenciaDto extends PartialType(CrearAsistenciaDto) {}
