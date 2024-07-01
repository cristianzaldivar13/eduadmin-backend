// usuario-existe.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class UsuarioExisteGuard implements CanActivate {
  constructor(private readonly usuariosService: UsuariosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usuarioId: string = request.body?.usuarioId;

    if (!usuarioId) {
      throw new Error('ID de usuario no proporcionado en la solicitud');
    }

    const usuario = await this.usuariosService.buscarPorId(usuarioId);

    if (!usuario) {
      throw new Error('El usuario no existe');
    }

    // Asignamos el usuario al request para que esté disponible en el controlador
    request.usuario = usuario;

    return true;
  }
}
