// src/roles/roles.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: String, enum: EnumEstatus })
  estatus: EnumEstatus;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
