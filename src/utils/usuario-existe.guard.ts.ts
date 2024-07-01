// usuario-existe.guard.ts

import { Injectable, CanActivate, ExecutionContext, BadRequestException, Body } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AsistenciasService } from '../asistencias/asistencias.service';
import { TipoAsistencia } from 'src/enums/tipos';

@Injectable()
export class ValidacionUsuarioGuard implements CanActivate {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly asistenciasService: AsistenciasService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usuarioId: string = request.body?.usuarioId;
    const tipo: TipoAsistencia = request.body?.tipo;

    if (!usuarioId) {
      throw new Error('ID de usuario no proporcionado en la solicitud');
    }

    const usuario = await this.usuariosService.buscarPorId(usuarioId);

    if (!usuario) {
      throw new BadRequestException('El usuario no existe.');
    }

    // Asignamos el usuario al request para que esté disponible en el controlador
    request.usuario = usuario;

    const asistencia = await this.asistenciasService.obtenerAsistenciaDelDia(usuarioId, tipo);

    if(asistencia.length) {
      throw new BadRequestException('La asistencia ya había sido registrada.');
    }

    return true;
  }
}
