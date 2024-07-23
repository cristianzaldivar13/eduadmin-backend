import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsBoolean, IsEnum } from 'class-validator';

export type AsistenciaDocument = Asistencia & Document;

@Schema()
export class Asistencia {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  grupoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  asignaturaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: Boolean, required: false })
  @IsBoolean()
  ingreso: boolean;

  @Prop({ type: Boolean, required: false })
  @IsBoolean()
  egreso: boolean;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}
