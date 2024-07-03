import { SchemaFactory } from '@nestjs/mongoose';
import { Usuario } from '../models/usuario.model';
import * as bcrypt from 'bcrypt';

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

// Middleware para cifrar la contraseña antes de guardarla
UsuarioSchema.pre<Usuario>('save', async function (next) {
  const user: any = this;

  if (!user.isModified('contrasena')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.contrasena, salt);
    user.contrasena = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
