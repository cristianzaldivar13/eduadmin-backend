import { PartialType } from '@nestjs/mapped-types';
import { CrearAsignaturaDto } from './create-asignatura.dto';

export class UpdateAsignaturaDto extends PartialType(CrearAsignaturaDto) {}
