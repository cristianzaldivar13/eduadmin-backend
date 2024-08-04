import { IsNotEmpty, IsMongoId, IsArray, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export class CrearGrupoDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsEnum(EnumNivel)
  nivel: EnumNivel

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
