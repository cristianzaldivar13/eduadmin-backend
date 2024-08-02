import { SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../models/roles.model';
import { Types } from 'mongoose';

export const RolesSchema = SchemaFactory.createForClass(Roles);

// Middleware para cambiar los id en ObjectId
RolesSchema.pre<Roles>('save', function (next) {
    const schemaData: any = this;
  
    if (
      schemaData.isModified('escuelaId') &&
      typeof schemaData.escuelaId === 'string'
    ) {
      schemaData.escuelaId = new Types.ObjectId(schemaData.escuelaId);
    }
  
    next();
  });
  
  // Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
  RolesSchema.pre('findOneAndUpdate', function (next) {
    const update: any = this.getUpdate();
  
    if (update.escuelaId && typeof update.escuelaId === 'string') {
      update.escuelaId = new Types.ObjectId(update.escuelaId);
    }
  
    if (update.$set) {
      if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
        update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
      }
    }
  
    update.fechaEdicion = new Date();
  
    next();
  });
  
  // Middleware para incrementar el campo __v al actualizar el documento
  RolesSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function () {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
  });