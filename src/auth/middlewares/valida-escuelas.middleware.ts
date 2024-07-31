import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumSecciones } from '../../utils/enums/secciones.enum';

@Injectable()
export class ValidaEscuelasMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const params = req.params;

    if (!Types.ObjectId.isValid(params.id)) {
      throw new BadRequestException(`El Id ${params.id} no es válido`);
    }

    // Obtiene el registro por su id
    let documento = await this.connection
      .collection(EnumSecciones.ESCUELAS.toLowerCase())
      .findOne({ _id: new Types.ObjectId(params.id) });

    if (!documento) {
      throw new BadRequestException(`El id ${params.id} no existe.`);
    }

    next();
  }
}
