import { IsEmail, IsNotEmpty, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { EnumNivel } from "../../utils/enums/niveles.enum";
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export class CrearEscuelaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly direccion: string;

  @IsNotEmpty()
  @IsString()
  readonly telefono: string;

  @IsNotEmpty()
  @IsEmail()
  readonly correoElectronico: string;

  @IsNotEmpty()
  @IsEnum(EnumNivel)
  nivelEducativo: EnumNivel;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFundacion: Date;

  @IsNotEmpty()
  @IsString()
  ciudad: string;

  @IsNotEmpty()
  @IsString()
  codigoPostal: string;

  @IsNotEmpty()
  @IsNumber()
  cupo: number;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
