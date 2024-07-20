import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';

export class CrearRolDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;
  
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsString()
  readonly descripcion: string;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
