import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  usuarioId: string;

  @Prop({ type: String, enum: EnumTipoAsistencia, required: true })
  tipo: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
