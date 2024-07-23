import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class ValidaIdDocumentoGuard implements CanActivate {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    const urlParts = request.url.split('/');
    const collectionName = urlParts[urlParts.length - 3].toLowerCase();

    try {
      const document = await this.connection.collection(collectionName).findOne({ _id: new Types.ObjectId(id) });

      if (!document) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }

      return true;
    } catch (error) {
      throw new BadRequestException(`Error al buscar el registro. ${error.message}`);
    }
  }
}
