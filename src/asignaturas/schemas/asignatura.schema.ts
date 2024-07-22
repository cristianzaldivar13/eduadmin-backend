import { SchemaFactory } from '@nestjs/mongoose';
import { Asignatura } from '../models/asignatura.model';

export const AsignaturaSchema = SchemaFactory.createForClass(Asignatura);

AsignaturaSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();

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
