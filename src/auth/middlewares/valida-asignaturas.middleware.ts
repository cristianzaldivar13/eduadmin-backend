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
export class ValidaAsignaturasMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split('/')[2];

    if (url === EnumVerbos.ACTUALIZAR) {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException('Debe enviar el id.');
      }

      const collectionName = EnumSecciones.ASIGNATURAS;

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

      try {
        if (!documento) {
          throw new BadRequestException(`El id ${id} no existe.`);
        }
      } catch (error) {
        throw new BadRequestException(`${error.message}`);
      }
    }

    if (url === EnumVerbos.CREAR) {
      if (req.body?.nombre) {
        // Obtiene el registro por su nombre
        const documento = await this.connection
          .collection(EnumSecciones.ASIGNATURAS.toLowerCase())
          .findOne({
            nombre: req.body?.nombre,
            nivel: req.body?.nivel,
          });

        if (documento) {
          throw new BadRequestException(
            `El nombre ${req.body?.nombre} con el nivel ${req.body?.nivel} ya existe.`,
          );
        }
      }
    }

    next();
  }
}
