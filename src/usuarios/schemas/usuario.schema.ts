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

// Middleware para actualizar fechaEdicion al actualizar el documento
UsuarioSchema.pre<Usuario>('findOneAndUpdate', function (next) {
  const user: any = this;
  user.set({ fechaEdicion: new Date() });
  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
UsuarioSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function() {
  this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
});
