import { PartialType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from './crear-usuario.dto';
import { IsOptional, IsDate, IsMongoId } from 'class-validator';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @IsOptional()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  grupoId: Types.ObjectId;

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
