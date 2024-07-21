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
