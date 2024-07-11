import { IsDate, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import { Types } from 'mongoose';

export class CrearAsistenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  usuarioId: Types.ObjectId;

  @IsDate()
  fecha: Date = new Date();

  @IsEnum(EnumTipoAsistencia)
  @IsNotEmpty()
  readonly tipo: EnumTipoAsistencia;
  }
  