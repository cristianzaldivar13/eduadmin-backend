import { PartialType } from '@nestjs/mapped-types';
import { CrearAsistenciaDto } from './crear-asistencia.dto';
import { IsOptional, IsMongoId, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class ActualizarAsistenciaDto extends PartialType(CrearAsistenciaDto) {
  @IsOptional()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  grupoId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  asignaturaId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  usuarioId: Types.ObjectId;

  @IsBoolean()
  @IsOptional()
  ingreso: boolean;

  @IsBoolean()
  @IsOptional()
  egreso: boolean;
}
