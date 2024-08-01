import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumSecciones } from '../../utils/enums/secciones.enum';
import { EnumVerbos } from '../../utils/enums/verbos.enum';

@Injectable()
export class ValidaEscuelasMiddleware implements NestMiddleware {
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

    const collectionName = EnumSecciones.ESCUELAS.toLowerCase();

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
    if (!Types.ObjectId.isValid(req.params.id)) {
      throw new BadRequestException(`El Id ${req.params.id} no es válido`);
    }

    // Obtiene el registro por su id
    let documento = await this.connection
      .collection(EnumSecciones.ESCUELAS.toLowerCase())
      .findOne({ _id: new Types.ObjectId(req.params.id) });

    if (!documento) {
      throw new BadRequestException(`El id ${req.params.id} no existe.`);
    }
  }

  async consultarPorId(req: any) {
    const id = req.params.id;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    try {
      const document = await this.connection
        .collection(EnumSecciones.ESCUELAS.toLowerCase())
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
