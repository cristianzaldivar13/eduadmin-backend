import { PartialType } from '@nestjs/mapped-types';
import { CrearEscuelaDto } from './create-escuela.dto';
import { IsOptional, IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { EnumNivel } from "../../utils/enums/niveles.enum";

export class ActualizarEscuelaDto extends PartialType(CrearEscuelaDto) {
  @IsOptional()
  @IsString()
  readonly nombre: string;

  @IsOptional()
  @IsEmail()
  readonly direccion: string;

  @IsOptional()
  @IsString()
  readonly telefono: string;

  @IsOptional()
  @IsString()
  readonly correoElectronico: string;

  @IsOptional()
  @IsEnum(EnumNivel)
  nivelEducativo: EnumNivel;

  @IsOptional()
  @IsString()
  director: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsDate()
  fechaFundacion: Date;

  @IsOptional()
  @IsString()
  ciudad: string;

  @IsOptional()
  @IsString()
  codigoPostal: string;

  @IsOptional()
  @IsNumber()
  cupo: number;

  @IsOptional()
  @IsString()
  descripcion: string;

}
