import { PartialType } from '@nestjs/mapped-types';
import { CrearEstudianteDto } from './create-estudiante.dto';

export class ActualizarEstudianteDto extends PartialType(CrearEstudianteDto) {
//   usuarioId?: never;
//   escuelaId?: never;
}
