import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import { IsEnum } from 'class-validator';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: String, required: true })
  usuarioId: string;

  @Prop({ type: String, enum: EnumTipoAsistencia, required: true })
  @IsEnum(EnumTipoAsistencia)
  tipo: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;
}
