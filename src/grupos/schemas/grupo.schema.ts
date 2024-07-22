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

  // Convierte escuelaId a ObjectId si es una cadena
  if (update.$set) {
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }

    // Convierte asignaturas a ObjectId si es un array
    if (Array.isArray(update.$set.asignaturas)) {
      update.$set.asignaturas = update.$set.asignaturas.map(
        (asignatura: any) => new Types.ObjectId(asignatura),
      );
    }
  }

  next();
});
