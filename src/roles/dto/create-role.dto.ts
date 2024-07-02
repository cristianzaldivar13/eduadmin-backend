import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumEstatus } from '../../utils/enums/estatus.enum';

export class CrearRolDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsString()
  readonly descripcion: string;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
