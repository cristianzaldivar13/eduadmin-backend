import { SchemaFactory } from '@nestjs/mongoose';
import { Usuario } from '../models/usuario.model';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

// Middleware para cifrar la contraseña antes de guardarla
UsuarioSchema.pre<Usuario>('save', async function (next) {
  const schemaData: any = this;

  if (
    schemaData.isModified('escuelaId') &&
    typeof schemaData.escuelaId === 'string'
  ) {
    schemaData.escuelaId = new Types.ObjectId(schemaData.escuelaId);
  }

  if (
    schemaData.isModified('grupoId') &&
    typeof schemaData.grupoId === 'string'
  ) {
    schemaData.grupoId = new Types.ObjectId(schemaData.grupoId);
  }

  if (schemaData.isModified('grupos') && Array.isArray(schemaData.grupos)) {
    schemaData.grupos = schemaData.grupos.map(
      (grupo: any) => new Types.ObjectId(grupo),
    );
  }

  if (schemaData.isModified('contrasena')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(schemaData.contrasena, salt);
      schemaData.contrasena = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  }
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
UsuarioSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();

  if (update.escuelaId && typeof update.escuelaId === 'string') {
    update.escuelaId = new Types.ObjectId(update.escuelaId);
  }
  if (update.grupoId && typeof update.grupoId === 'string') {
    update.grupoId = new Types.ObjectId(update.grupoId);
  }
  if (update.grupos && Array.isArray(update.grupos)) {
    update.grupos = update.grupos.map(
      (grupo: any) => new Types.ObjectId(grupo),
    );
  }

  if (update.$set) {
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
    if (update.$set.grupoId && typeof update.$set.grupoId === 'string') {
      update.$set.grupoId = new Types.ObjectId(update.$set.grupoId);
    }
    if (update.$set.grupos && Array.isArray(update.$set.grupos)) {
      update.$set.grupos = update.$set.grupos.map(
        (grupo: any) => new Types.ObjectId(grupo),
      );
    }
  }

  update.fechaEdicion = new Date();

  next();
});

// Middleware para actualizar fechaEdicion al actualizar el documento
UsuarioSchema.pre<Usuario>('findOneAndUpdate', function (next) {
  const schemaData: any = this;
  schemaData.set({ fechaEdicion: new Date() });
  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
UsuarioSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function () {
  this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
});
