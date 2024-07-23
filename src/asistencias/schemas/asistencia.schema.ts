import { SchemaFactory } from '@nestjs/mongoose';
import { Asistencia } from '../models/asistencia.model';
import { model, Types } from 'mongoose';

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);

// Middleware para cambiar los id en ObjectId al guardar
AsistenciaSchema.pre<Asistencia>('save', function (next) {
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

  next();
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
AsistenciaSchema.pre('findOneAndUpdate', function (next) {
  let update: any = this.getUpdate();

  // Convierte los ids a ObjectId en update y update.$set
  if (update.usuarioId && typeof update.usuarioId === 'string') {
    update.usuarioId = new Types.ObjectId(update.usuarioId);
  }
  if (update.escuelaId && typeof update.escuelaId === 'string') {
    update.escuelaId = new Types.ObjectId(update.escuelaId);
  }

  if (update.$set) {
    if (update.$set.usuarioId && typeof update.$set.usuarioId === 'string') {
      update.$set.usuarioId = new Types.ObjectId(update.$set.usuarioId);
    }
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
  }

  // Agrega la fecha de edición
  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
AsistenciaSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function () {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
  },
);

export const AsistenciaModel = model(Asistencia.name, AsistenciaSchema);
