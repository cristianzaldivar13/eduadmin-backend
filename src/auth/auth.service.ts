import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(correo: string, contrasena: string): Promise<any> {
    const user = await this.usuariosService.buscarPorCorreo(correo);
    if (user && await bcrypt.compare(contrasena, user.contrasena)) {
      const { contrasena, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { correo: user.correo, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
