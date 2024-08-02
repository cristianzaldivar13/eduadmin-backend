import { SchemaFactory } from '@nestjs/mongoose';
import { Asignatura } from '../models/asignatura.model';
import { Types } from 'mongoose';

export const AsignaturaSchema = SchemaFactory.createForClass(Asignatura);

// Middleware para cambiar los id en ObjectId al guardar
AsignaturaSchema.pre<Asignatura>('save', function (next) {
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

  next();
});

AsignaturaSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();

  if (update.escuelaId && typeof update.escuelaId === 'string') {
    update.escuelaId = new Types.ObjectId(update.escuelaId);
  }

  if (update.grupoId && typeof update.grupoId === 'string') {
    update.grupoId = new Types.ObjectId(update.grupoId);
  }

  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
AsignaturaSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function () {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
  },
);
