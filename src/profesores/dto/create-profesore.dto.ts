import { IsNotEmpty, IsMongoId, IsEnum, IsArray } from "class-validator";
import { Types } from "mongoose";
import { EnumEstatus } from "../../utils/enums/estatus.enum";
import { EnumNivel } from "../../utils/enums/niveles.enum";
import { EnumSexualidad } from "../../utils/enums/sexualidad.enum";

export class CrearProfesoreDto {
  @IsNotEmpty()
  @IsMongoId()
  usuarioId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsArray()
  grupos: Array<Types.ObjectId>;

  @IsNotEmpty()
  nombre: string;

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

  @IsNotEmpty()
  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
