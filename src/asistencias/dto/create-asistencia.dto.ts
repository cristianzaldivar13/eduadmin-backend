import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';

export class CrearAsistenciaDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsEnum(EnumTipoAsistencia)
  tipoAsistencia: EnumTipoAsistencia;

  @IsBoolean()
  @IsOptional()
  ingreso: boolean;

  @IsBoolean()
  @IsOptional()
  egreso: boolean;
}
