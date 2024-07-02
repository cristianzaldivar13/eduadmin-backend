// src/usuarios/schemas/usuario.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ type: String, enum: EnumRolesUsuario })
  rol: EnumRolesUsuario;

  @Prop()
  qrCode: string;

  @Prop({ unique: true })
  idNumerico: number;

  @Prop({ type: String, enum: EnumEstatus })
  estatus: EnumEstatus;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
