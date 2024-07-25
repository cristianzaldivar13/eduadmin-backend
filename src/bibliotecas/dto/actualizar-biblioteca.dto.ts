import { PartialType } from '@nestjs/mapped-types';
import { CreateBibliotecaDto } from './crear-biblioteca.dto';

export class UpdateBibliotecaDto extends PartialType(CreateBibliotecaDto) {
  id: number;
}
