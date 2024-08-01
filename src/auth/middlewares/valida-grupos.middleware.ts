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
export class ValidaGruposMiddleware implements NestMiddleware {
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
    const collectionName = EnumSecciones.GRUPOS.toLowerCase();

    try {
      const document = await this.connection
        .collection(collectionName)
        .findOne({ nombre: req?.body?.nombre });

      if (document) {
        throw new BadRequestException(
          `El nombre ${req?.body?.nombre} ya existe.`,
        );
      }
    } catch (error) {
      throw new BadRequestException(`Error. ${error.message}`);
    }
  }

  async actualizar(req: any) {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    const collectionName = EnumSecciones.GRUPOS.toLowerCase();

    try {
      const document = await this.connection
        .collection(collectionName)
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
        .findOne({ _id: new Types.ObjectId(id) });

      if (!documento) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }
    }

    // Validaciones especiales con objetos
    if (req.body?.asignaturas) {
      for (const asignaturaId of req.body.asignaturas) {
        if (!Types.ObjectId.isValid(asignaturaId)) {
          throw new BadRequestException(`El Id ${asignaturaId} no es válido`);
        }
        const asignatura = await this.connection
          .collection(EnumSecciones.ASIGNATURAS.toLowerCase())
          .findOne({ _id: new Types.ObjectId(asignaturaId) });

        if (!asignatura) {
          throw new BadRequestException(`El Id ${asignaturaId} no existe`);
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
        .collection(EnumSecciones.GRUPOS.toLowerCase())
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
}