import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import { IsEnum } from 'class-validator';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: Types.ObjectId, required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: String, enum: EnumTipoAsistencia, required: true })
  @IsEnum(EnumTipoAsistencia)
  tipo: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;
}
