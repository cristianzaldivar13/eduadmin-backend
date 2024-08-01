import { IsNotEmpty, IsMongoId, IsArray, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { EnumNivel } from '../../utils/enums/niveles.enum';

export class CrearGrupoDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsArray()
  asignaturas: Array<Types.ObjectId>;

  @IsNotEmpty()
  @IsEnum(EnumNivel)
  nivel: EnumNivel

}
