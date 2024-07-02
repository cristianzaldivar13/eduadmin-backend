import { IsDate, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import mongoose from 'mongoose';

export class CrearAsistenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  usuarioId: mongoose.Types.ObjectId;

  @IsDate()
  fecha: Date = new Date();

  @IsEnum(EnumTipoAsistencia)
  @IsNotEmpty()
  readonly tipo: EnumTipoAsistencia;
  }
  