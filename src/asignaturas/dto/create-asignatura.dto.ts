import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EnumEstatus } from "../../utils/enums/estatus.enum";
import { EnumNivel } from "../../utils/enums/niveles.enum";

export class CrearAsignaturaDto {
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
