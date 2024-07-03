import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

@Schema()
export class Usuario {
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
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
