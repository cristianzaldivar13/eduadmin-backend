import { SchemaFactory } from '@nestjs/mongoose';
import { Asistencia } from '../models/asistencia.model';

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
