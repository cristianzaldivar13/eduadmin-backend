import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export type CalendarioEscolarDocument = CalendarioEscolar & Document;

@Schema()
export class CalendarioEscolar {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Types.ObjectId, required: true })
  materiaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  profesorId: Types.ObjectId;

  @Prop({ default: false })
  esSuplente: boolean;

  @Prop({ required: true })
  estatus: EnumEstatus;

  @Prop({ required: true })
  fechaInicio: Date;

  @Prop({ required: true })
  fechaFin: Date;
}
