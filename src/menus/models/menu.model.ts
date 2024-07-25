import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { EnumSecciones } from '../../utils/enums/secciones.enum';

export type MenuDocument = Menu & Document;

@Schema({ collection: EnumSecciones.MENUS.toLocaleLowerCase() })
export class Menu {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  menuId: Types.ObjectId;

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: Boolean, required: true })
  subMenu: boolean;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const CalificacionSchema = SchemaFactory.createForClass(Menu);

// Middleware para agregar la fecha de modificación antes de actualizar
CalificacionSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaEdicion: new Date() });
  next();
});
