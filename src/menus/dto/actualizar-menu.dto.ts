import { PartialType } from '@nestjs/mapped-types';
import { CrearMenuDto } from './crear-menu.dto';

export class ActualizarMenuDto extends PartialType(CrearMenuDto) {}
