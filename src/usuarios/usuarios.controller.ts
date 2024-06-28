import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ValidateRolesGuard } from '../auth/validate-roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('CrearUsuario')
  @UseGuards(ValidateRolesGuard)
  async create(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crearUsuario(crearUsuarioDto);
  }
}
