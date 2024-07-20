import { IsEmail, IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';

export class CrearUsuarioDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;
  
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsEmail()
  readonly correo: string;

  @IsNotEmpty()
  @IsString()
  readonly contrasena: string;

  @IsNotEmpty()
  @IsEnum(EnumRolesUsuario)
  readonly rol: EnumRolesUsuario;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
