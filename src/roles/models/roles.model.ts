// src/roles/roles.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: String, enum: EnumEstatus })
  estatus: EnumEstatus;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
