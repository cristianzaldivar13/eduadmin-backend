import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CrearAsistenciaDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly alumnoId: ObjectId;

  @IsEnum(['ingreso', 'egreso'])
  @IsNotEmpty()
  readonly tipo: 'ingreso' | 'egreso';
  }
  