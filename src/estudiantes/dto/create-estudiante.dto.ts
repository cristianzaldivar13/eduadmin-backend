import { IsArray, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { EnumEstatus } from "../../utils/enums/estatus.enum";
import { EnumNivel } from "../../utils/enums/niveles.enum";
import { EnumSexualidad } from "../../utils/enums/sexualidad.enum";
import { Types } from "mongoose";

export class CrearEstudianteDto {
    @IsNotEmpty()
    @IsMongoId()
    usuarioId: Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    escuelaId: Types.ObjectId;

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellidoPaterno: string;

    @IsNotEmpty()
    apellidoMaterno: string;

    @IsNotEmpty()
    fechaNacimiento: Date;

    @IsNotEmpty()
    sexo: EnumSexualidad;

    @IsNotEmpty()
    telefono: string;

    @IsNotEmpty()
    @IsEnum(EnumNivel, { each: true })
    @IsArray()
    niveles: EnumNivel[];

    @IsNotEmpty()
    @IsEnum(EnumEstatus)
    readonly estatus: EnumEstatus;
}
