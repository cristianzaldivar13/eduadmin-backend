import { SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../models/roles.model';

export const RolesSchema = SchemaFactory.createForClass(Roles);