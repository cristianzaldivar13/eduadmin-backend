import { IsEmail, IsNotEmpty, IsString, IsEnum, IsMongoId, IsArray, IsOptional } from 'class-validator';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { EnumSexualidad } from '../../utils/enums/sexualidad.enum';
import { Types } from 'mongoose';

export class CrearUsuarioDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  grupoId: Types.ObjectId;
  
  @IsNotEmpty()
  @IsEnum(EnumRolesUsuario)
  readonly rol: EnumRolesUsuario;

  @IsNotEmpty()
  matricula: string;

  @IsOptional()
  @IsArray()
  grupos: Array<Types.ObjectId>;

  @IsOptional()
  @IsArray()
  menus: Array<Types.ObjectId>;

  @IsNotEmpty()
  @IsEmail()
  readonly correo: string;

  @IsNotEmpty()
  @IsString()
  readonly contrasena: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  apellidoPaterno: string;

  @IsNotEmpty()
  apellidoMaterno: string;

  @IsNotEmpty()
  fechaNacimiento: Date;

  @IsNotEmpty()
  sexo: EnumSexualidad;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  @IsEnum(EnumNivel, { each: true })
  @IsArray()
  niveles: EnumNivel[];

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
