import { SchemaFactory } from '@nestjs/mongoose';
import { Usuario } from '../models/usuario.model';
import * as bcrypt from 'bcrypt';

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

// Middleware para cifrar la contraseña antes de guardarla
UsuarioSchema.pre<Usuario>('save', async function (next) {
  const schemaData: any = this;

  if (!schemaData.isModified('contrasena')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(schemaData.contrasena, salt);
    schemaData.contrasena = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Middleware para actualizar fechaEdicion al actualizar el documento
UsuarioSchema.pre<Usuario>('findOneAndUpdate', function (next) {
  const schemaData: any = this;
  schemaData.set({ fechaEdicion: new Date() });
  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
UsuarioSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function() {
  this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
});
