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
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';

@Injectable()
export class ValidaRegistroGuard implements CanActivate {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    const url = request.url.split('/')[1];

    // Filtra los campos que terminan en "Id" y extrae los valores de los ids
    const idCampos = Object.keys(body).filter((key) => key.endsWith('Id'));

    // Validaciones especiales con los Ids
    for (const campo of idCampos) {
      const id = body[campo];
      if (!id) {
        throw new BadRequestException(`Debe enviar un valor para ${campo}.`);
      }

      if (!Types.ObjectId.isValid(id) && id) {
        throw new BadRequestException(`El Id ${id} no es válido`);
      }

      const nombreColeccion = campo.replace(/Id$/, 's');

      // Obtiene el registro por su id
      let documento = await this.connection
        .collection(nombreColeccion)
        .findOne({ _id: new Types.ObjectId(id) });

      try {
        switch (nombreColeccion) {
          case EnumSecciones.USUARIOS.toLowerCase():
            if (!documento?.rol) {
              throw new BadRequestException(
                `El id ${id} de usuario asignado no existe.`,
              );
            }
            if (
              documento?.rol != EnumRolesUsuario.ESTUDIANTE &&
              url === EnumSecciones.USUARIOS
            ) {
              throw new BadRequestException(
                `El id ${id} de usuario asignado debe pertenecer a un tipo Estudiante.`,
              );
            }

            if (
              documento?.rol !== EnumRolesUsuario.PROFESOR &&
              url === EnumSecciones.USUARIOS
            ) {
              throw new BadRequestException(
                `El id ${id} de usuario asignado debe pertenecer a un tipo Profesor.`,
              );
            }

            if (
              body?.tipoAsistencia == EnumTipoAsistencia.CLASE &&
              !body?.asignaturaId
            ) {
              throw new BadRequestException(
                `Falta enviar el Id de la asignatura para la asistencia de tipo ${EnumTipoAsistencia.CLASE}.`,
              );
            }
            break;
        }
      } catch (error) {
        throw new BadRequestException(`${error.message}`);
      }
    }

    // Validaciones especiales con objetos
    switch (url) {
      case EnumSecciones.GRUPOS:
        if (body?.asignaturas) {
          for (const idAsignatura of body.asignaturas) {
            if (!Types.ObjectId.isValid(idAsignatura)) {
              throw new BadRequestException(
                `El Id ${idAsignatura} de la asignatura no es válido`,
              );
            }
            const asignatura = await this.connection
              .collection(EnumSecciones.ASIGNATURAS.toLowerCase())
              .findOne({ _id: new Types.ObjectId(idAsignatura) });

            if (!asignatura) {
              throw new BadRequestException(
                `El Id ${idAsignatura} de la asignatura no existe`,
              );
            }
          }
        }

        break;

      case EnumSecciones.USUARIOS:
        if (body?.grupos) {
          for (const idGrupo of body.grupos) {
            if (!Types.ObjectId.isValid(idGrupo)) {
              throw new BadRequestException(`El Id ${idGrupo} no es válido`);
            }
            const grupo = await this.connection
              .collection(EnumSecciones.GRUPOS.toLowerCase())
              .findOne({ _id: new Types.ObjectId(idGrupo) });

            if (!grupo) {
              throw new BadRequestException(`El Id ${idGrupo} no existe`);
            }
          }

          if (body?.menus) {
            for (const idMenu of body.menus) {
              if (!Types.ObjectId.isValid(idMenu)) {
                throw new BadRequestException(
                  `El Id ${idMenu} del menú no es válido`,
                );
              }
              const menu = await this.connection
                .collection(EnumSecciones.MENUS.toLowerCase())
                .findOne({ _id: new Types.ObjectId(idMenu) });

              if (!menu) {
                throw new BadRequestException(
                  `El Id ${idMenu} del menú no existe`,
                );
              }
            }
          }
        }

        break;
    }

    return true;
  }
}
