import { Schema } from 'mongoose';

export const UsuarioSchema = new Schema({
  nombre: String,
  correo: String,
  contrasena: String,
  roles: [String],
  activo: { type: Boolean, default: true },
});
