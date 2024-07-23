import { PartialType } from '@nestjs/mapped-types';
import { CrearAsistenciaDto } from './create-asistencia.dto';
import { IsOptional, IsMongoId, IsNotEmpty, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class ActualizarAsistenciaDto extends PartialType(CrearAsistenciaDto) {
    @IsOptional()
    @IsMongoId()
    usuarioId: Types.ObjectId;
  
    @IsNotEmpty()
    @IsMongoId()
    escuelaId: Types.ObjectId;
  
    @IsBoolean()
    @IsOptional()
    ingreso: boolean;
  
    @IsBoolean()
    @IsOptional()
    egreso: boolean;
}
