import { PartialType } from '@nestjs/mapped-types';
import { CrearGrupoDto } from './create-grupo.dto';

export class ActualizarGrupoDto extends PartialType(CrearGrupoDto) {}
