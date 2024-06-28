// src/roles/roles.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;
}

export const RolSchema = SchemaFactory.createForClass(Roles);
