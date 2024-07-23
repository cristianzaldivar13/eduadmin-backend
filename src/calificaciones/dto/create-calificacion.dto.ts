import {
  IsNotEmpty,
  IsMongoId,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CrearCalificacionDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  profesorId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  estudianteId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  asignaturaId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  grupoId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  periodo: string;

  @IsNotEmpty()
  @IsString()
  tipoEvaluacion: string;

  @IsNotEmpty()
  @IsNumber()
  calificacion: number;

  @IsOptional()
  @IsString()
  comentarios?: string;
}
