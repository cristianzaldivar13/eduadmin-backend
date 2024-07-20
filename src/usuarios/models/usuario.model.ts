import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';

@Schema()
export class Usuario {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ type: String, enum: EnumRolesUsuario })
  rol: EnumRolesUsuario;

  @Prop()
  qrCode: string;

  @Prop({ type: String, enum: EnumEstatus, default: EnumEstatus.ACTIVO })
  estatus: EnumEstatus;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
