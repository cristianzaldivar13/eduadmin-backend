import { Schema } from 'mongoose';

export const RolesSchema = new Schema({
  nombre: String,
  descripcion: String,
  contrasena: String,
  activo: { type: Boolean, default: true },
});
