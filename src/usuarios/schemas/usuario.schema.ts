import { Schema } from 'mongoose';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import * as bcrypt from 'bcrypt';

export const UsuarioSchema = new Schema({
  nombre: String,
  correo: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  contrasena: String,
  rol: { type: String, enum: EnumRolesUsuario },
  qrCode: String,
  estatus: { type: String, enum: EnumEstatus },
});

// Middleware para cifrar la contraseña antes de guardarla
UsuarioSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('contrasena')) return next();

  const salt = await bcrypt.genSalt(10);
  user.contrasena = await bcrypt.hash(user.contrasena, salt);
  next();
});
