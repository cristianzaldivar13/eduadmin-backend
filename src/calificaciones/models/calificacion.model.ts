import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { EnumSecciones } from '../../utils/enums/secciones.enum';

export type CalificacionDocument = Calificacion & Document;

@Schema({ collection: EnumSecciones.CALIFICACIONES.toLocaleLowerCase() })
export class Calificacion {
  @Prop({ type: Types.ObjectId, required: true })
  escuelaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  profesorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  estudianteId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  asignaturaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  grupoId: Types.ObjectId;

  @Prop({ type: String, required: true })
  periodo: string;

  @Prop({ type: String, required: true })
  tipoEvaluacion: string;

  @Prop({ type: Number, required: true })
  calificacion: number;

  @Prop({ type: String })
  comentarios?: string;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const CalificacionSchema = SchemaFactory.createForClass(Calificacion);

// Middleware para agregar la fecha de modificación antes de actualizar
CalificacionSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaEdicion: new Date() });
  next();
});
