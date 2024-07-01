import { Schema } from 'mongoose';
import { RolesUsuario } from '../../enums/roles-usuario.enum';

export const UsuarioSchema = new Schema({
  nombre: String,
  correo: String,
  contrasena: String,
  rol: { type: String, enum: RolesUsuario },
  qrCode: String,
  activo: { type: Boolean, default: true },
});
