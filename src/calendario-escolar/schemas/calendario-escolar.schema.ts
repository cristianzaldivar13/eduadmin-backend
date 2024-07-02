import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CalendarioEscolarDocument = CalendarioEscolar & Document;

@Schema()
export class CalendarioEscolar {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  materiaId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  profesorId: string;

  @Prop({ type: Boolean, required: false })
  esSuplente: boolean;
}

export const CalendarioEscolarSchema =
  SchemaFactory.createForClass(CalendarioEscolar);
