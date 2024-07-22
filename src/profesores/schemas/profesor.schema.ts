import { SchemaFactory } from '@nestjs/mongoose';
import { Profesor } from '../models/profesor.model';
import { Types } from 'mongoose';

export const ProfesorSchema = SchemaFactory.createForClass(Profesor);

// Middleware para cambiar los id en ObjectId al guardar
ProfesorSchema.pre<Profesor>('save', function (next) {
  const schemaData: any = this;

  if (
    schemaData.isModified('usuarioId') &&
    typeof schemaData.usuarioId === 'string'
  ) {
    schemaData.usuarioId = new Types.ObjectId(schemaData.usuarioId);
  }

  if (
    schemaData.isModified('escuelaId') &&
    typeof schemaData.escuelaId === 'string'
  ) {
    schemaData.escuelaId = new Types.ObjectId(schemaData.escuelaId);
  }

  if (schemaData.isModified('grupos') && Array.isArray(schemaData.grupos)) {
    schemaData.grupos = schemaData.grupos.map(
      (grupo: any) => new Types.ObjectId(grupo),
    );
  }

  next();
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
ProfesorSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();

  // Convierte los ids a ObjectId en update y update.$set
  if (update.usuarioId && typeof update.usuarioId === 'string') {
    update.usuarioId = new Types.ObjectId(update.usuarioId);
  }
  if (update.escuelaId && typeof update.escuelaId === 'string') {
    update.escuelaId = new Types.ObjectId(update.escuelaId);
  }
  if (update.grupos && Array.isArray(update.grupos)) {
    update.grupos = update.grupos.map(
      (grupo: any) => new Types.ObjectId(grupo),
    );
  }

  if (update.$set) {
    if (update.$set.usuarioId && typeof update.$set.usuarioId === 'string') {
      update.$set.usuarioId = new Types.ObjectId(update.$set.usuarioId);
    }
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
    if (update.$set.grupos && Array.isArray(update.$set.grupos)) {
      update.$set.grupos = update.$set.grupos.map(
        (grupo: any) => new Types.ObjectId(grupo),
      );
    }
  }

  // Agrega la fecha de edición
  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
ProfesorSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function () {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
  },
);
