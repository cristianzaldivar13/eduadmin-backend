import { PartialType } from '@nestjs/mapped-types';
import { CrearProfesoreDto } from './create-profesore.dto';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { IsOptional, IsMongoId, IsArray, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class ActualizarProfesoreDto extends PartialType(CrearProfesoreDto) {
  @IsOptional()
  @IsMongoId()
  escuelaId: Types.ObjectId;

  @IsOptional()
  nombre: string;

  @IsOptional()
  @IsArray()
  grupos: Array<Types.ObjectId>;

  @IsOptional()
  @IsEnum(EnumNivel, { each: true })
  @IsArray()
  niveles: EnumNivel[];
}
