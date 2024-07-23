import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    // Verificar la existencia de los roles en la base de datos
    const rolesCollection = this.connection.collection('roles');
    const existingRoles = await rolesCollection.find({ nombre: { $in: roles } }).toArray();

    const existingRolesNames = existingRoles.map(role => role.nombre);
    const allRolesExist = roles.every(role => existingRolesNames.includes(role));

    if (!allRolesExist) {
      throw new ForbiddenException('Uno o más roles no existen en la base de datos');
    }

    const hasRole = roles.includes(user.rol);

    if (!(user && user.rol && hasRole)) {
      throw new ForbiddenException('Recurso inaccesible');
    }

    return true;
  }
}
