import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { EnumSecciones } from '../../utils/enums/secciones.enum';

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
};

@Injectable()
export class ValidarIdsDocumentosGuard implements CanActivate {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    // Filtra los campos que terminan en "Id" y extrae los valores de los ids
    const idFields = Object.keys(body).filter((key) => key.endsWith('Id'));

    // Filtra los campos de id en los filtros
    const idFiltersFields = body?.filtros || {};

    // Validar los IDs
    await Promise.all(
      idFields.map(async (field) => {
        const id = body[field];
        if (!id) {
          throw new BadRequestException(`Debe enviar un valor para ${field}.`);
        }

        if (!Types.ObjectId.isValid(id)) {
          throw new BadRequestException(`El Id ${id} no es válido`);
        }

        let collectionName = this.getCollectionName(field);

        // Normalizar el nombre de la colección para ciertos casos especiales
        if (
          collectionName.toLowerCase() ===
            EnumSecciones.PROFESORES.toLowerCase() ||
          collectionName.toLowerCase() ===
            EnumSecciones.ESTUDIANTES.toLowerCase()
        ) {
          collectionName = EnumSecciones.USUARIOS.toLowerCase();
        }

        try {
          const document = await this.connection
            .collection(collectionName)
            .findOne({ _id: new Types.ObjectId(id) });

          if (!document) {
            throw new BadRequestException(
              `El Id ${id} no existe en ${collectionName}.`,
            );
          }
        } catch (error) {
          throw new BadRequestException(
            `Error al buscar el registro del Id ${id}: ${error.message}`,
          );
        }
      }),
    );

    // Verificar filtros de IDs si existen
    for (const [key, value] of Object.entries(idFiltersFields)) {
      const id: any = value;
      const idField = key.endsWith('Id');

      if (!Types.ObjectId.isValid(id) && idField) {
        throw new BadRequestException(`El Id ${id} no es válido`);
      }

      if (idField) {
        let collectionName = this.getCollectionName(key);

        // Normalizar el nombre de la colección para ciertos casos especiales
        if (
          collectionName.toLowerCase() ===
            EnumSecciones.PROFESORES.toLowerCase() ||
          collectionName.toLowerCase() ===
            EnumSecciones.ESTUDIANTES.toLowerCase()
        ) {
          collectionName = EnumSecciones.USUARIOS.toLowerCase();
        }

        const document = await this.connection
          .collection(collectionName)
          .findOne({ _id: new Types.ObjectId(id) });

        if (!document) {
          throw new BadRequestException(
            `El id ${id} no existe en ${collectionName}.`,
          );
        }
      }
    }

    return true;
  }

  private getCollectionName(field: string): string {
    const baseName = field.replace(/Id$/, '');
    return excepciones[baseName] || `${baseName}s`;
  }
}
