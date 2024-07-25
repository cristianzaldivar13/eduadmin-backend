import { PartialType } from '@nestjs/mapped-types';
import { CrearGrupoDto } from './crear-grupo.dto';
import { IsOptional, IsMongoId, IsEnum, IsArray } from 'class-validator';
import { EnumNivel } from '../../utils/enums/niveles.enum';
import { Types } from 'mongoose';

export class ActualizarGrupoDto extends PartialType(CrearGrupoDto) {
    @IsOptional()
    @IsMongoId()
    escuelaId: Types.ObjectId;

    @IsOptional()
    nombre: string;

    @IsOptional()
    @IsArray()
    asignaturas: Array<Types.ObjectId>;

    @IsOptional()
    @IsEnum(EnumNivel)
    nivel: EnumNivel
}
