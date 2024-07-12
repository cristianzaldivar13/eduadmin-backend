import { PartialType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from './create-usuario.dto';
import { IsOptional, IsDate } from 'class-validator';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @IsOptional()
  @IsDate()
  readonly fechaEdicion?: Date;

  @IsOptional()
  readonly nombre?: string;

  @IsOptional()
  readonly correo?: string;

  @IsOptional()
  readonly contrasena?: string;

  @IsOptional()
  readonly rol?: EnumRolesUsuario;

  @IsOptional()
  readonly estatus?: EnumEstatus;
}
