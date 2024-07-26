import { PartialType } from '@nestjs/mapped-types';
import { CrearAsignaturaDto } from './crear-asignatura.dto';

export class ActualizarAsignaturaDto extends PartialType(CrearAsignaturaDto) {}
