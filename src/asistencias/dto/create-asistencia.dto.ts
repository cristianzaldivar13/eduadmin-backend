import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CrearAsistenciaDto {
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
