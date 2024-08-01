import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumTipoAsistencia } from '../../utils/enums/tipos.enum';
import { EnumVerbos } from '../../utils/enums/verbos.enum';
import { EnumSecciones } from '../../utils/enums/secciones.enum';

@Injectable()
export class ValidaAsistenciasMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split('/')[2].toLowerCase();

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
    }

    next();
  }

  async actualizar(req: any) {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    const collectionName = EnumSecciones.ASISTENCIAS.toLowerCase();

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
      if (
        req.body?.tipoAsistencia == EnumTipoAsistencia.CLASE &&
        !req.body?.asignaturaId
      ) {
        throw new BadRequestException(
          `Falta enviar el Id de la asignatura para la asistencia de tipo ${EnumTipoAsistencia.CLASE}.`,
        );
      }

      const nombreColeccion = campo.replace(/Id$/, 's');
      const document = await this.connection
        .collection(nombreColeccion)
        .findOne({ _id: new Types.ObjectId(id) });

      if (!document) {
        throw new BadRequestException(`El id ${id} no existe.`);
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
        .collection(EnumSecciones.ASISTENCIAS.toLowerCase())
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
