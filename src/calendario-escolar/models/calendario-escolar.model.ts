import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumEstatus } from "../../utils/enums/estatus.enum";
import mongoose, { Document } from 'mongoose';

@Schema()
export class CalendarioEscolar extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  materiaId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  profesorId: mongoose.Types.ObjectId;

  @Prop({ default: false })
  esSuplente: boolean;

  @Prop({ required: true })
  estatus: EnumEstatus;

  @Prop({ required: true })
  fechaInicio: Date;

  @Prop({ required: true })
  fechaFin: Date;
}

export const CalendarioEscolarSchema = SchemaFactory.createForClass(CalendarioEscolar);
