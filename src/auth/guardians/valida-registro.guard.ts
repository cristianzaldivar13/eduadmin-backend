import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { EnumSecciones } from '../../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';

@Injectable()
export class ValidaRegistroGuard implements CanActivate {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    // Filtra los campos que terminan en "Id" y extrae los valores de los ids
    const idCampos = Object.keys(body).filter((key) => key.endsWith('Id'));

    for (const campo of idCampos) {
      const id = body[campo];
      if (!id) {
        throw new BadRequestException(`Debe enviar un valor para ${campo}.`);
      }

      const nombreColeccion = campo.replace(/Id$/, 's');

      // Obtiene el registro por su id
      let documento = await this.connection
        .collection(nombreColeccion)
        .findOne({ _id: new Types.ObjectId(id) });

      try {
        switch (nombreColeccion) {
          case EnumSecciones.ADMINISTRACIONES:
            break;

          case EnumSecciones.ASIGNATURAS:
            break;

          case EnumSecciones.ASISTENCIAS:
            break;

          case EnumSecciones.BIBLIOTECAS:
            break;

          case EnumSecciones.CALENDARIO:
            break;

          case EnumSecciones.COMUNICACIONES:
            break;

          case EnumSecciones.CURSOS:
            break;

          case EnumSecciones.ESTUDIANTES:
            break;

          case EnumSecciones.ESCUELAS.toLowerCase():
            if (!documento) {
              throw new BadRequestException(
                `El id ${id} de escuela asignada no existe.`,
              );
            }
            break;

          case EnumSecciones.EVENTOS:
            break;

          case EnumSecciones.FINANZAS:
            break;

          case EnumSecciones.NOTIFICACIONES:
            break;

          case EnumSecciones.PROFESORES:
            break;

          case EnumSecciones.REPORTES:
            break;

          case EnumSecciones.ROLES:
            break;

          case EnumSecciones.TUTORES:
            break;

          case EnumSecciones.USUARIOS.toLowerCase():
            if (documento.rol != EnumRolesUsuario.ESTUDIANTE) {
              throw new BadRequestException(
                `El id ${id} de usuario asignado debe pertenecer a un tipo Estudiante.`,
              );
              break;
            }
            break;

          case EnumSecciones.VISITANTES:
            break;

          case EnumSecciones.AUTH:
            break;
        }
      } catch (error) {
        throw new BadRequestException(
          `${nombreColeccion}: ${error.message}`,
        );
      }
    }

    return true;
  }
}
