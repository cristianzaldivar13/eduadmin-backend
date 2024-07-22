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

  if (update.$set) {
    if (update.$set.usuarioId && typeof update.$set.usuarioId === 'string') {
      update.$set.usuarioId = new Types.ObjectId(update.$set.usuarioId);
    }
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
  }

  next();
});
