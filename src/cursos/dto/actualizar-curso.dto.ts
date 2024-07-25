import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './crear-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
  id: number;
}
