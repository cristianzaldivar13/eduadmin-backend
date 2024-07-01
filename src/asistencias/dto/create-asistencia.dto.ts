import { IsDate, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { TipoAsistencia } from '../../enums/tipos';

export class CrearAsistenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  usuarioId: any;

  @IsDate()
  fecha: Date = new Date();

  @IsEnum(TipoAsistencia)
  @IsNotEmpty()
  readonly tipo: TipoAsistencia;
  }
  