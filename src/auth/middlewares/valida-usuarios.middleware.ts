import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection, Types } from 'mongoose';
import { EnumSeccion, EnumSecciones } from '../../utils/enums/secciones.enum';

@Injectable()
export class ValidaUsuariosMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { menus, rol } = req.body;
    const menusId: Types.ObjectId[] = [];

    if (menus && menus.length) {
      for (const menuId of menus) {
        if (!Types.ObjectId.isValid(menuId)) {
          throw new BadRequestException(`El Id ${menuId} no es válido`);
        }
        menusId.push(new Types.ObjectId(menuId));
      }

      const listMenu = await this.connection
        .collection(EnumSecciones.MENUS.toLowerCase())
        .find({ _id: { $in: menusId } })
        .toArray();

      if (!listMenu.length) {
        throw new BadRequestException(
          `No se encontró un menú con los Ids proporcionados`,
        );
      }

      const menuRoles = listMenu.find(
        (menu) => menu.nombre === EnumSecciones.ROLES,
      )?._id;

      if (menuRoles) {
        if (
          (menuRoles && EnumSeccion.PROFESOR === rol) ||
          EnumSeccion.ESTUDIANTE === rol
        ) {
          throw new BadRequestException(
            `El menuId ${menuRoles} no se permite para el rol ${rol}`,
          );
        }
      }
    }

    next();
  }
}
