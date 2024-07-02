import { Schema } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export const RolesSchema = new Schema({
  nombre: String,
  descripcion: String,
  contrasena: String,
  estatus: { type: String, enum: EnumEstatus },
});
