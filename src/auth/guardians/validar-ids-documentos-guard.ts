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
};

@Injectable()
export class ValidarIdsDocumentosGuard implements CanActivate {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    // Filtra los campos que terminan en "Id" y extrae los valores de los ids
    const idFields = Object.keys(body).filter((key) => key.endsWith('Id'));

    for (const field of idFields) {
      const id = body[field];
      if (!id) {
        throw new BadRequestException(`Debe enviar un valor para ${field}.`);
      }

      let collectionName = this.getCollectionName(field);

      try {
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
          throw new BadRequestException(`El id ${id} no existe.`);
        }
      } catch (error) {
        throw new BadRequestException(
          `Error al buscar el registro Ids. ${error.message}`,
        );
      }
    }

    return true;
  }

  private getCollectionName(field: string): string {
    const baseName = field.replace(/Id$/, '');
    return excepciones[baseName] || `${baseName}s`;
  }
}
