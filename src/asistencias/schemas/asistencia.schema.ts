import { Schema } from 'mongoose';

export const AsistenciaSchema = new Schema({
  alumnoId: { type: String, required: true },
  tipo: { type: String, required: true },
  fecha: { type: Date, required: true, default: Date.now },
});
