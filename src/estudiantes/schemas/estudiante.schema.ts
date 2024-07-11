import { SchemaFactory } from '@nestjs/mongoose';
import { Estudiante } from '../models/estudiante.model';

export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);
