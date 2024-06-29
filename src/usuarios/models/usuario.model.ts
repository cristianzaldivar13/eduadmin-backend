// src/usuarios/schemas/usuario.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TiposUsuario } from '../../enums/tiposUsuario.enum';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ type: [String], enum: TiposUsuario, default: [TiposUsuario.ALUMNO] })
  roles: TiposUsuario[];

  @Prop()
  qrCode: string;

  @Prop({ unique: true })
  idNumerico: number;

  @Prop({ default: true })
  activo: boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
