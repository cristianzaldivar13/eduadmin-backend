// src/usuarios/dto/create-usuario.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export class CrearUsuarioDto {
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
