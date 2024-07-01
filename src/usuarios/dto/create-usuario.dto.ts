// src/usuarios/dto/create-usuario.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { RolesUsuario } from '../../enums/roles-usuario.enum';

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
  @IsEnum(RolesUsuario)
  readonly rol: RolesUsuario;
}
