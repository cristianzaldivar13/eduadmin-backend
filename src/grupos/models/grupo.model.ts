import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { EnumNivel } from '../../utils/enums/niveles.enum';

export type GrupoDocument = Grupo & Document;

@Schema()
export class Grupo {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: Array, required: true })
  asignaturas: Array<Types.ObjectId>;

  @Prop({ required: true, type: String, enum: EnumNivel })
  nivel: EnumNivel;
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
