import { PartialType } from '@nestjs/mapped-types';
import { CrearRolDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CrearRolDto) {
  id: number;
}
