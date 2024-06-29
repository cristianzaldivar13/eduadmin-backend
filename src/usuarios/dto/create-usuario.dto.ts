// src/usuarios/dto/create-usuario.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TiposUsuario } from '../../enums/tiposUsuario.enum';

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
  @IsEnum(TiposUsuario, { each: true })
  readonly roles: TiposUsuario[];
}
