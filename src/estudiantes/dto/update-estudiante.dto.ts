import { PartialType } from '@nestjs/mapped-types';
import { CrearEstudianteDto } from './create-estudiante.dto';
import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class ActualizarEstudianteDto extends PartialType(CrearEstudianteDto) {
    @IsOptional()
    @IsMongoId()
    usuarioId: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    escuelaId: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    grupoId: Types.ObjectId;
}
