import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class ValidarIdsDocumentosGuard implements CanActivate {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    // Filtra los campos que terminan en "Id" y extrae los valores de los ids
    const idFields = Object.keys(body).filter(key => key.endsWith('Id'));
    
    for (const field of idFields) {
      const id = body[field];
      if (!id) {
        throw new BadRequestException(`Debe enviar un valor para ${field}.`);
      }
      
      const collectionName = field.replace(/Id$/, 's'); // Convertir "escuelaId" a "escuelas"
      
      try {
        const document = await this.connection.collection(collectionName).findOne({ _id: new Types.ObjectId(id) });

        if (!document) {
          throw new BadRequestException(`El id ${id} no existe.`);
        }
      } catch (error) {
        throw new BadRequestException(`Error al buscar el registro. ${error.message}`);
      }
    }

    return true;
  }
}
