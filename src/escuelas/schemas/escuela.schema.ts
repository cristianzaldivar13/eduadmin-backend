import { SchemaFactory } from '@nestjs/mongoose';
import { Escuelas } from '../models/escuela.model';

export const EscuelaSchema = SchemaFactory.createForClass(Escuelas);

// Middleware para actualizar fechaEdicion al actualizar el documento
EscuelaSchema.pre<Escuelas>('findOneAndUpdate', function (next) {
  const schemaData: any = this;
  schemaData.set({ fechaEdicion: new Date() });
  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
EscuelaSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function() {
  this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
});
