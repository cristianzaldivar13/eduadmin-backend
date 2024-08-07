import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(correo: string, contrasena: string): Promise<any> {
    const user = await this.usuariosService.buscarPorCorreo(correo);
    if (user && (await bcrypt.compare(contrasena, user.contrasena))) {
      const { contrasena, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JWTPayload = {
      escuelaId: user._doc.escuelaId.toString(),
      correo: user._doc.correo,
      rol: user._doc.rol,
      estatus: user._doc.estatus,
      id: user._doc._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
