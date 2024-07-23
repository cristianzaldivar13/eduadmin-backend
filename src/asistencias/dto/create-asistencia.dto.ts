import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CrearAsistenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  grupoId: Types.ObjectId;

  @IsNotEmpty()
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
