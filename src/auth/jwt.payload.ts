import { EnumEstatus } from "src/utils/enums/estatus.enum";

export interface JWTPayload {
  correo: string;
  rol: string;
  estatus: EnumEstatus;
  sub: string;
}
