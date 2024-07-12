import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Param } from '@nestjs/common';

@Injectable()
export class ValidateUsersGuard implements CanActivate {
  constructor(private readonly usuariosService: UsuariosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    if (!id) {
      throw new BadRequestException('Debe enviar el id.');
    }

    const validUser = await this.usuariosService.buscarPorId(id);

    if (!validUser) {
      throw new BadRequestException(`El id ${id} no existe`);
    }

    return true;
  }
}
