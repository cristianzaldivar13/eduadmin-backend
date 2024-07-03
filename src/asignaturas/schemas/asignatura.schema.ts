import { SchemaFactory } from '@nestjs/mongoose';
import { Asignatura } from '../models/asignatura.model';

export const AsignaturaSchema = SchemaFactory.createForClass(Asignatura);
