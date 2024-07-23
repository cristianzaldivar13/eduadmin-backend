import { SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Calificacion } from '../models/calificacion.model';

export const CalificacionSchema = SchemaFactory.createForClass(Calificacion);

// Middleware para cambiar los id en ObjectId
CalificacionSchema.pre<Calificacion>('save', function (next) {
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

  if (
    schemaData.isModified('profesorId') &&
    typeof schemaData.profesorId === 'string'
  ) {
    schemaData.profesorId = new Types.ObjectId(schemaData.profesorId);
  }

  if (
    schemaData.isModified('asignaturaId') &&
    typeof schemaData.asignaturaId === 'string'
  ) {
    schemaData.asignaturaId = new Types.ObjectId(schemaData.asignaturaId);
  }

  next();
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
CalificacionSchema.pre('findOneAndUpdate', function (next) {
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
  if (update.profesorId && typeof update.profesorId === 'string') {
    update.profesorId = new Types.ObjectId(update.profesorId);
  }
  if (update.asignaturaId && typeof update.asignaturaId === 'string') {
    update.asignaturaId = new Types.ObjectId(update.asignaturaId);
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
    if (update.$set.profesorId && typeof update.$set.profesorId === 'string') {
        update.$set.profesorId = new Types.ObjectId(update.$set.profesorId);
      }
      if (update.$set.asignaturaId && typeof update.$set.asignaturaId === 'string') {
        update.$set.asignaturaId = new Types.ObjectId(update.$set.asignaturaId);
      }
  }

  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
CalificacionSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function () {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
  },
);
