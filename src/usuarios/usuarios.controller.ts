import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ValidateRolesGuard } from '../auth/guardians/validate-roles.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { Role } from '../auth/decorators/Role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { ValidateUsersGuard } from '../auth/guardians/validate-users.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ActualizarUsuarioDto } from './dto/update-usuario.dto';

@ApiTags(EnumSecciones.USUARIOS)
@Controller(EnumSecciones.USUARIOS)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('CrearUsuario')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidateRolesGuard, JwtAuthGuard, JwtGuard)
  async crearUsuario(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crearUsuario(crearUsuarioDto);
  }

  @Patch('ActualizarUsuario/:id')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidateUsersGuard, JwtAuthGuard, JwtGuard)
  async ActualizarUsuario(
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
    @Param('id') id: string,
  ) {
    return await this.usuariosService.actualizarUsuario(
      id,
      actualizarUsuarioDto,
    );
  }
}
