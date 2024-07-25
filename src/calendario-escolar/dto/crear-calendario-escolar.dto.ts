import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString, isEnum } from "class-validator";
import { EnumEstatus } from "../../utils/enums/estatus.enum";
import { Types } from "mongoose";

export class CrearCalendarioEscolarDto {
    @IsNotEmpty()
    @IsMongoId()
    escuelaId: Types.ObjectId;
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly materiaId: string;
    
    @IsMongoId()
    readonly profesorId: string;

    @IsBoolean()
    readonly esSuplente?: boolean;

    @IsEnum(EnumEstatus)
    readonly estatus: EnumEstatus;

    @IsDate()
    readonly fechaInicio: Date;

    @IsDate()
    readonly fechaFin: Date;
}