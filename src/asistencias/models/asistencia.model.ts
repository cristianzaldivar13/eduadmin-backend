import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import { IsEnum } from 'class-validator';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  usuarioId: mongoose.Types.ObjectId;

  @Prop({ type: String, enum: EnumTipoAsistencia, required: true })
  @IsEnum(EnumTipoAsistencia)
  readonly tipo: EnumTipoAsistencia;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
