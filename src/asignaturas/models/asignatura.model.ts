import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { EnumNivel } from '../../utils/enums/niveles.enum';

export type AsignaturaDocument = Asignatura & Document;

@Schema()
export class Asignatura {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  grupoId: Types.ObjectId;
  
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: String, enum: EnumEstatus, required: true })
  estatus: EnumEstatus;

  @Prop({ type: String, enum: EnumNivel, required: true })
  nivel: EnumNivel;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}
