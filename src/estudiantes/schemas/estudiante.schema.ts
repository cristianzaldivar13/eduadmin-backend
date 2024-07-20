import { SchemaFactory } from '@nestjs/mongoose';
import { Estudiante } from '../models/estudiante.model';
import { Document, Types } from 'mongoose';

export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);
