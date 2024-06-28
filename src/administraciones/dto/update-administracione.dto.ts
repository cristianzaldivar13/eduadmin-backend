import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministracioneDto } from './create-administracione.dto';

export class UpdateAdministracioneDto extends PartialType(CreateAdministracioneDto) {
  id: number;
}
