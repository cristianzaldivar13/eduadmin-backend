import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ValidateRolesGuard } from '../auth/validate-roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/decorators/Role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.USUARIOS)
@Controller(EnumSecciones.USUARIOS)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('CrearUsuario')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidateRolesGuard, JwtAuthGuard, JwtGuard)
  async create(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crearUsuario(crearUsuarioDto);
  }
}
