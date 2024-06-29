import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  alumnoId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  fecha: Date;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
