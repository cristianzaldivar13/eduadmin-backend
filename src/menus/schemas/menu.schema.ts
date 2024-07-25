import { SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Menu } from '../models/menu.model';

export const MenuSchema = SchemaFactory.createForClass(Menu);

// Middleware para cambiar los id en ObjectId
MenuSchema.pre<Menu>('save', function (next) {
  const schemaData: any = this;

  if (
    schemaData.isModified('escuelaId') &&
    typeof schemaData.escuelaId === 'string'
  ) {
    schemaData.escuelaId = new Types.ObjectId(schemaData.escuelaId);
  }

  if (
    schemaData.isModified('menuId') &&
    typeof schemaData.menuId === 'string'
  ) {
    schemaData.menuId = new Types.ObjectId(schemaData.menuId);
  }

  next();
});

// Middleware para cambiar los id en ObjectId antes de actualizar con findOneAndUpdate
MenuSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();

  if (update.escuelaId && typeof update.escuelaId === 'string') {
    update.escuelaId = new Types.ObjectId(update.escuelaId);
  }
  if (update.menuId && typeof update.menuId === 'string') {
    update.menuId = new Types.ObjectId(update.menuId);
  }

  if (update.$set) {
    if (update.$set.escuelaId && typeof update.$set.escuelaId === 'string') {
      update.$set.escuelaId = new Types.ObjectId(update.$set.escuelaId);
    }
    if (update.$set.menuId && typeof update.$set.menuId === 'string') {
      update.$set.menuId = new Types.ObjectId(update.$set.menuId);
    }
  }

  update.fechaEdicion = new Date();

  next();
});

// Middleware para incrementar el campo __v al actualizar el documento
MenuSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function () {
  this.findOneAndUpdate({}, { $inc: { __v: 1 } }, { new: true });
});
