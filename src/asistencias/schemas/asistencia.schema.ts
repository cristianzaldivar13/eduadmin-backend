import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TipoAsistencia } from '../../enums/tipos';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  usuarioId: string;

  @Prop({ type: String, enum: TipoAsistencia, required: true })
  tipo: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
