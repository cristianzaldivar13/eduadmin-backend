import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ type: [String], default: [] }) // Array de strings para los roles del usuario
  roles: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
