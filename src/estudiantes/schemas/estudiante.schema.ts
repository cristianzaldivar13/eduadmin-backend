import { SchemaFactory } from '@nestjs/mongoose';
import { Estudiante } from '../models/estudiante.model';
import { Types } from 'mongoose';

export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);

// Middleware para cambiar los id en ObjectId
EstudianteSchema.pre<Estudiante>('save', function (next) {
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

  if (
    schemaData.isModified('grupoId') &&
    typeof schemaData.grupoId === 'string'
  ) {
    schemaData.grupoId = new Types.ObjectId(schemaData.grupoId);
  }

  next();
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
EstudianteSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();
  if (update.usuarioId && typeof update.usuarioId === 'string') {
    update.usuarioId = new Types.ObjectId(update.usuarioId);
  }
  if (update.escuelaId && typeof update.escuelaId === 'string') {
    update.escuelaId = new Types.ObjectId(update.escuelaId);
  }
  if (update.grupoId && typeof update.grupoId === 'string') {
    update.grupoId = new Types.ObjectId(update.grupoId);
  }

  if (update.$set) {
    if (update.$set.usuarioId && typeof update.$set.usuarioId === 'string') {
      update.$set.usuarioId = new Types.ObjectId(update.$set.usuarioId);
    }
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
    if (update.$set.grupoId && typeof update.$set.grupoId === 'string') {
      update.$set.grupoId = new Types.ObjectId(update.$set.grupoId);
    }
  }

  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
EstudianteSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function () {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
  },
);
