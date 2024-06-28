import { PartialType } from '@nestjs/mapped-types';
import { CreateFamiliareDto } from './create-familiare.dto';

export class UpdateFamiliareDto extends PartialType(CreateFamiliareDto) {
  id: number;
}
