import { IsNotEmpty, IsString, IsBoolean, IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';

export class CrearMenuDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  menuId: Types.ObjectId = null;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly subMenu: boolean;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
