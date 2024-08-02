import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumVerbos } from '../../utils/enums/verbos.enum';
import { EnumSecciones } from '../../utils/enums/secciones.enum';

@Injectable()
export class ValidaRolesMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split('/')[2].toLowerCase();

    switch (url) {
      case EnumVerbos.CREAR.toLowerCase():
        await this.crear(req);
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

  async crear(req: any) {
    if (!req.body?.escuelaId) {
      throw new BadRequestException(`El rol ${req.body?.nombre} debe asignarse a una escuela`);
    }

    if (!req.body?.nombre) {
      throw new BadRequestException(`El rol se le debe asignar un nombre`);
    }
  }

  async actualizar(req: any) {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    const collectionName = EnumSecciones.ROLES.toLowerCase();

    try {
      const document = await this.connection
        .collection(collectionName)
        .countDocuments({ _id: new Types.ObjectId(id) });

      if (!document) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar el registro Id. ${error.message}`,
      );
    }
  }

  async validaciones(req: any) {
    // Filtra los campos que terminan en "Id" y extrae los valores de los ids
    const idCampos = Object.keys(req.body).filter((key) => key.endsWith('Id'));

    // Validaciones especiales con los Ids
    for (const campo of idCampos) {
      const id = req.body[campo];
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
        .countDocuments({ _id: new Types.ObjectId(id) });

      if (!documento) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }
    }

    // Validar que si subMenu es true, se debe proporcionar menuId
    if (req.body.subMenu) {
      if (!req.body.menuId) {
        throw new BadRequestException(
          'Se requiere menuId cuando subMenu es verdadero',
        );
      }
      // Asegúrate de que menuId sea un ObjectId válido
      if (!Types.ObjectId.isValid(req.body.menuId)) {
        throw new BadRequestException('El Id del menú no es válido');
      }
    } else {
      // Si subMenu es false y menuId es proporcionado, arroja error
      if (req.body.menuId) {
        throw new BadRequestException(
          'No se debe proporcionar menuId cuando subMenu es falso',
        );
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
        .collection(EnumSecciones.ROLES.toLowerCase())
        .countDocuments({ _id: new Types.ObjectId(id) });

      if (!document) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar el registro Id. ${error.message}`,
      );
    }
  }
}
