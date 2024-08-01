import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumSeccion, EnumSecciones } from '../../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../../utils/enums/roles-usuario.enum';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import { EnumVerbos } from '../../utils/enums/verbos.enum';

const excepciones = {
  profesor: 'profesores',
  estudiante: 'estudiantes',
  usuario: 'usuarios',
  grupo: 'grupos',
  escuela: 'escuelas',
  asistencia: 'asistencias',
  asignatura: 'asignaturas',
  calendario: 'calendarios',
  rol: 'roles',
  menu: 'menus',
};

@Injectable()
export class ValidaUsuariosMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split('/')[2];

    switch (url) {
      case EnumVerbos.CREAR.toLowerCase():
        await this.validaciones(req);
        break;
      case EnumVerbos.ACTUALIZAR.split('/')[0].toLowerCase():
        await this.actualizar(req);
        await this.validaciones(req);
        break;
      case EnumVerbos.CONSULTAR_POR_ID.split('/')[0].toLowerCase():
        await this.consultarPorId(req);
        break;
      default:
        await this.validaciones(req);
        break;
    }

    next();
  }

  async actualizar(req: any) {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    const nombreColeccion = EnumSecciones.USUARIOS.toLowerCase();

    try {
      const documento = await this.connection
        .collection(nombreColeccion)
        .findOne({ _id: new Types.ObjectId(id) });

      if (!documento) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar el registro Id. ${error.message}`,
      );
    }
  }

  async validaciones(req: any) {
    // Obtiene las claves del objeto req.body
    const claves = Object.keys(req.body);
    const { menus, rol } = req.body;
    const menusId: Types.ObjectId[] = [];

    // Filtra las claves que terminan en "Id"
    const idCampos = claves.filter((clave) => clave.endsWith('Id'));

    // Verificar filtros de IDs si existen
    for (const campo of idCampos) {
      const id: any = req.body[campo]; // Extrae el valor del campo
      const idField = campo.endsWith('Id');

      if (!Types.ObjectId.isValid(id) && idField) {
        throw new BadRequestException(`El Id ${id} no es válido`);
      }

      if (idField) {
        let nombreColeccion = this.getCollectionName(campo);

        // Normaliza el nombre de la colección para ciertos casos especiales
        if (
          nombreColeccion.toLowerCase() ===
            EnumSecciones.PROFESORES.toLowerCase() ||
          nombreColeccion.toLowerCase() ===
            EnumSecciones.ESTUDIANTES.toLowerCase()
        ) {
          nombreColeccion = EnumSecciones.USUARIOS.toLowerCase();
        }

        const documento = await this.connection
          .collection(nombreColeccion)
          .findOne({ _id: new Types.ObjectId(id) });

        if (!documento) {
          throw new BadRequestException(`El id ${id} no existe.`);
        }

        // Validaciones adicionales basadas en el documento
        if (
          req.body?.tipoAsistencia == EnumTipoAsistencia.CLASE &&
          !req.body?.asignaturaId
        ) {
          throw new BadRequestException(
            `Falta enviar el Id de la asignatura para la asistencia de tipo ${EnumTipoAsistencia.CLASE}.`,
          );
        }
      }
    }

    // Validaciones especiales con objetos
    if (req.body?.grupos) {
      for (const grupoId of req.body.grupos) {
        if (!Types.ObjectId.isValid(grupoId)) {
          throw new BadRequestException(`El Id ${grupoId} no es válido`);
        }
        const grupo = await this.connection
          .collection(EnumSecciones.GRUPOS.toLowerCase())
          .findOne({ _id: new Types.ObjectId(grupoId) });

        if (!grupo) {
          throw new BadRequestException(`El Id ${grupoId} no existe`);
        }
      }
    }

    if (req.body?.menus) {
      for (const idMenu of req.body.menus) {
        if (!Types.ObjectId.isValid(idMenu)) {
          throw new BadRequestException(
            `El Id ${idMenu} del menú no es válido`,
          );
        }
        const menu = await this.connection
          .collection(EnumSecciones.MENUS.toLowerCase())
          .findOne({ _id: new Types.ObjectId(idMenu) });

        if (!menu) {
          throw new BadRequestException(`El Id ${idMenu} del menú no existe`);
        }
      }
    }

    if (menus && menus.length) {
      for (const menuId of menus) {
        menusId.push(new Types.ObjectId(menuId));
      }

      const listMenu = await this.connection
        .collection(EnumSecciones.MENUS.toLowerCase())
        .find({ _id: { $in: menusId } })
        .toArray();

      if (!listMenu.length) {
        throw new BadRequestException(
          `No se encontró un menú con los Ids proporcionados`,
        );
      }

      const menuRoles = listMenu.find(
        (menu) => menu.nombre === EnumSecciones.ROLES,
      )?._id;

      if (menuRoles) {
        if (
          (menuRoles && EnumSeccion.PROFESOR === rol) ||
          EnumSeccion.ESTUDIANTE === rol
        ) {
          throw new BadRequestException(
            `El menuId ${menuRoles} no se permite para el rol ${rol}`,
          );
        }
      }
    }
  }

  async consultarPorId(req: any) {
    const id = req.params.id;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    try {
      const document = await this.connection
        .collection(EnumSecciones.USUARIOS.toLowerCase())
        .findOne({ _id: new Types.ObjectId(id) });

      if (!document) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar el registro Id. ${error.message}`,
      );
    }
  }

  private getCollectionName(field: string): string {
    const baseName = field.replace(/Id$/, '');
    return excepciones[baseName] || `${baseName}s`;
  }
}
