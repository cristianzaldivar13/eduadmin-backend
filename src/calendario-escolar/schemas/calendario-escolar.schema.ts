import { SchemaFactory } from '@nestjs/mongoose';
import { CalendarioEscolar } from '../models/calendario-escolar.model';

export const CalendarioEscolarSchema = SchemaFactory.createForClass(CalendarioEscolar);
