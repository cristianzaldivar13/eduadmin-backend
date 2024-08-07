import { EnumEstatus } from "src/utils/enums/estatus.enum";

export interface JWTPayload {
  escuelaId: string;
  correo: string;
  rol: string;
  estatus: EnumEstatus;
  id: string;
}
