import { SchemaFactory } from '@nestjs/mongoose';
import { Grupo } from '../models/grupo.model';
import { Types } from 'mongoose';

export const GrupoSchema = SchemaFactory.createForClass(Grupo);

// Middleware para cambiar los id en ObjectId antes de guardar
GrupoSchema.pre<Grupo>('save', function (next) {
  const schemaData: any = this;

  // Convierte asignaturas a ObjectId si es un array
  if (Array.isArray(schemaData.asignaturas)) {
    schemaData.asignaturas = schemaData.asignaturas.map(
      (asignatura: any) => new Types.ObjectId(asignatura),
    );
  }

  // Convierte escuelaId a ObjectId si es una cadena
  if (
    schemaData.isModified('escuelaId') &&
    typeof schemaData.escuelaId === 'string'
  ) {
    schemaData.escuelaId = new Types.ObjectId(schemaData.escuelaId);
  }

  next();
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
GrupoSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();

  // Si se está usando la operación $set, actualiza los campos dentro de $set
  if (update.$set) {
    if (update.$set.asignaturas && Array.isArray(update.$set.asignaturas)) {
      update.$set.asignaturas = update.$set.asignaturas.map(
        (asignatura: any) => new Types.ObjectId(asignatura),
      );
    }

    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
  } else {
    // Si no se usa $set, actualiza los campos directamente
    if (update.asignaturas && Array.isArray(update.asignaturas)) {
      update.asignaturas = update.asignaturas.map(
        (asignatura: any) => new Types.ObjectId(asignatura),
      );
    }

    if (update.escuelaId && typeof update.escuelaId === 'string') {
      update.escuelaId = new Types.ObjectId(update.escuelaId);
    }
  }
  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
GrupoSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function () {
  this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
});
