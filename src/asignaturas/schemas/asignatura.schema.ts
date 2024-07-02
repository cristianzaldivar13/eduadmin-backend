import { Schema } from 'mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { EnumNivel } from "../../utils/enums/niveles.enum";

export const AsignaturaSchema = new Schema({
  nombre: String,
  descripcion: String,
  estatus: { type: String, enum: EnumEstatus },
  nivel: { type: String, enum: EnumNivel, required: true },
});
