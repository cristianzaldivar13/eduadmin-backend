import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { EnumNivel } from '../../utils/enums/niveles.enum';

@Schema()
export class Escuelas {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  correoElectronico: string;

  @Prop({ type: String, enum: EnumNivel, required: true })
  nivelEducativo: EnumNivel;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: true })
  fechaFundacion: Date;

  @Prop({ required: true })
  ciudad: string;

  @Prop({ required: true })
  codigoPostal: string;

  @Prop({ required: true })
  cupo: number;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: String, enum: EnumEstatus, required: true })
  estatus: EnumEstatus;

  @Prop({ type: Date, default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Date })
  fechaEdicion: Date;
}

export const EscuelaSchema = SchemaFactory.createForClass(Escuelas);
