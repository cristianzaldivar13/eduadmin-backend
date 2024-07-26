import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { EnumSexualidad } from '../../utils/enums/sexualidad.enum';

@Schema()
export class Usuario {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: false })
  grupoId: Types.ObjectId;

  @Prop({ type: Array, required: false })
  grupos: Array<Types.ObjectId>;

  @Prop({ type: Array, required: false })
  menus: Array<Types.ObjectId>;

  @Prop({ type: String, required: true })
  matricula: string;

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

  @Prop({ required: true, type: [String], enum: EnumNivel })
  niveles: EnumNivel[];

  @Prop()
  qrCode: string;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ type: String, enum: EnumRolesUsuario })
  rol: EnumRolesUsuario;

  @Prop({ type: String, enum: EnumEstatus, default: EnumEstatus.ACTIVO })
  estatus: EnumEstatus;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
