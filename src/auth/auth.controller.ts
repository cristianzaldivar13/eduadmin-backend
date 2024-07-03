// src/auth/auth.controller.ts
import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    const user = await this.authService.validateUser(loginUsuarioDto.correo, loginUsuarioDto.contrasena);
    if (!user) {
      return { message: 'Usuario o contraseña incorrectos' };
    }
    return this.authService.login(user);
  }
}
