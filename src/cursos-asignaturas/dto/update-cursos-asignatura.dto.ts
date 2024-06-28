import { PartialType } from '@nestjs/mapped-types';
import { CreateCursosAsignaturaDto } from './create-cursos-asignatura.dto';

export class UpdateCursosAsignaturaDto extends PartialType(CreateCursosAsignaturaDto) {
  id: number;
}
