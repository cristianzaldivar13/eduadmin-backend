import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumSexualidad } from '../../utils/enums/sexualidad.enum';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types, Document } from 'mongoose';

export type EstudianteDocument = Estudiante & Document;

@Schema()
export class Estudiante {
  @Prop({ type: Types.ObjectId, required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  apellidoPaterno: string;

  @Prop({ type: String, required: true })
  apellidoMaterno: string;

  @Prop({ type: Date, required: true })
  fechaNacimiento: Date;

  @Prop({ type: String, enum: EnumSexualidad })
  sexo: EnumSexualidad;

  @Prop({ type: String, required: true })
  telefono: string;

  @Prop({ type: Number, required: true })
  edad: number;

  @Prop({ required: true, type: [String], enum: EnumNivel })
  niveles: EnumNivel[];

  @Prop({ type: String, enum: EnumEstatus, required: true })
  estatus: EnumEstatus;
}

export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);
