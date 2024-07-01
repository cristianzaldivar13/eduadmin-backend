import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class ValidateRolesGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { rol } = request.body;

    if (!rol) {
      throw new BadRequestException('Debe enviar el rol.');
    }

    const validRoles = await this.rolesService.buscarTodo();
    const validRoleNames = validRoles.map(role => role.nombre);

      if (!validRoleNames.includes(rol)) {
        throw new BadRequestException(`El rol ${rol} no existe`);
    }

    return true;
  }
}
