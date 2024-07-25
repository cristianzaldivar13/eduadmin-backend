import { IsNotEmpty, IsString, IsBoolean, IsMongoId, IsEnum } from 'class-validator';
import { EnumEstatus } from '../../utils/enums/estatus.enum';
import { Types } from 'mongoose';

export class CrearMenuDto {
  @IsNotEmpty()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  menuId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly subMenu: boolean;

  @IsEnum(EnumEstatus)
  readonly estatus: EnumEstatus;
}
