import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class ValidateRolesGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { roles } = request.body;

    if (!roles || !Array.isArray(roles)) {
      throw new BadRequestException('Roles must be an array');
    }

    const validRoles = await this.rolesService.buscarTodo();
    const validRoleNames = validRoles.map(role => role.nombre);

    for (const role of roles) {
      if (!validRoleNames.includes(role)) {
        throw new BadRequestException(`Role ${role} does not exist`);
      }
    }

    return true;
  }
}
