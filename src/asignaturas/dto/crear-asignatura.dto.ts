import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { EnumEstatus } from "../../utils/enums/estatus.enum";
import { EnumNivel } from "../../utils/enums/niveles.enum";
import { Types } from "mongoose";

export class CrearAsignaturaDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;
  
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsString()
  readonly descripcion: string;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;

  @IsNotEmpty()
  @IsEnum(EnumNivel)
  readonly nivel: EnumNivel;
}
