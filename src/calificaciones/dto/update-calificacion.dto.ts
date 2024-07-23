import { PartialType } from '@nestjs/mapped-types';
import { CrearCalificacionDto } from './create-calificacion.dto';

export class ActualizarCalificacioneDto extends PartialType(CrearCalificacionDto) {}
