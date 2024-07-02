import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document, Types } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { EnumNivel } from "../../utils/enums/niveles.enum";

export type AsignaturaDocument = Asignatura & Document;

@Schema()
export class Asignatura {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: String, enum: EnumEstatus, required: true })
  estatus: EnumEstatus;

  @Prop({ type: String, enum: EnumNivel, required: true })
  nivel: EnumNivel;
}

export const AsignaturaSchema = SchemaFactory.createForClass(Asignatura);
