import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumVerbos } from '../../utils/enums/verbos.enum';
import { EnumSeccion, EnumSecciones } from '../../utils/enums/secciones.enum';

@Injectable()
export class ValidaCalificacionesMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split('/')[2];

    if (EnumVerbos.ACTUALIZAR.toString().includes(url)) {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException('Debe enviar el id.');
      }

      const collectionName = EnumSecciones.CALIFICACIONES.toLowerCase();

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

      let nombreColeccion = this.pluralizar(campo);
      const tipoUsuario = campo.replace('Id', '').toLowerCase();

      switch (nombreColeccion) {
        case EnumSecciones.PROFESORES.toLowerCase():
        case EnumSecciones.ESTUDIANTES.toLowerCase():
          nombreColeccion = EnumSecciones.USUARIOS.toLowerCase();
          break;
      }

      // Obtiene el registro por su id
      let documento: any = await this.connection
        .collection(nombreColeccion)
        .findOne({ _id: new Types.ObjectId(id) });

      if (!documento) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }

      if (documento.rol === EnumSeccion.PROFESOR) {
        if (tipoUsuario === EnumSeccion.ESTUDIANTE.toLowerCase()) {
          throw new BadRequestException(
            `El estudiante ${id} no puede ser un profesor.`,
          );
        }
      }

      if (documento.rol === EnumSeccion.ESTUDIANTE) {
        if (tipoUsuario === EnumSeccion.PROFESOR.toLowerCase()) {
          throw new BadRequestException(
            `El profesor ${id} no puede ser un estudiante.`,
          );
        }
      }
    }

    next();
  }

  pluralizar(nombre: string): string {
    // Reemplaza 'Id' al final del nombre
    let baseNombre = nombre.replace(/Id$/, '');

    // Casos especiales
    const casosEspeciales: { [key: string]: string } = {
      profesor: 'profesores',
      // Añadir más casos especiales aquí si es necesario
    };

    // Manejar casos especiales
    if (casosEspeciales[baseNombre]) {
      return casosEspeciales[baseNombre];
    }

    // Reglas básicas de pluralización
    if (
      baseNombre.endsWith('s') ||
      baseNombre.endsWith('x') ||
      baseNombre.endsWith('z')
    ) {
      return baseNombre + 'es';
    } else if (baseNombre.endsWith('y')) {
      return baseNombre.slice(0, -1) + 'ies';
    } else {
      return baseNombre + 's';
    }
  }
}
