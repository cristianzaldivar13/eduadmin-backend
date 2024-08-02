import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export type GrupoDocument = Grupo & Document;

@Schema()
export class Grupo {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, enum: EnumEstatus, required: true })
  estatus: EnumEstatus;

  @Prop({ required: true, type: String, enum: EnumNivel })
  nivel: EnumNivel;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
