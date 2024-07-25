import { PartialType } from '@nestjs/mapped-types';
import { CrearRolDto } from './crear-role.dto';

export class ActualizarRolDto extends PartialType(CrearRolDto) {}
