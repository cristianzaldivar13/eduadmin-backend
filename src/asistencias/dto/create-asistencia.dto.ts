import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CrearAsistenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  alumnoId: string;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;

  @IsEnum(['ingreso', 'egreso'])
  @IsNotEmpty()
  readonly tipo: 'ingreso' | 'egreso';
  }
  