import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TipoAsistencia } from '../../enums/tipos';
import { IsEnum } from 'class-validator';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  usuarioId: string;

  @Prop({ type: String, enum: TipoAsistencia, required: true })
  @IsEnum(TipoAsistencia)
  tipo: string; 

  @Prop({ default: Date.now })
  fecha: Date;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
