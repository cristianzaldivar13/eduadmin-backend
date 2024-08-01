import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ValidaRolGuard } from '../auth/guardians/valida-rol.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { Role } from '../auth/decorators/Role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { PaginacionDto } from '../utils/dtos/paginacion.dto';

@ApiTags(EnumSecciones.USUARIOS)
@Controller(EnumSecciones.USUARIOS)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post(EnumVerbos.CREAR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.SECRETARIO,
    EnumRolesUsuario.DIRECTOR,
  )
  @UseGuards(ValidaRolGuard, JwtAuthGuard, JwtGuard)
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crear(crearUsuarioDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async actualizar(
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
    @Param('id') id: string,
  ) {
    return await this.usuariosService.actualizar(id, actualizarUsuarioDto);
  }

  @Get(EnumVerbos.CONSULTAR_POR_ID)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  consultarPorId(@Param('id') id: string) {
    return this.usuariosService.consultarPorId(id);
  }

  @Post(EnumVerbos.PAGINAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async paginar(@Body() body: PaginacionDto) {
    const { limit, skip, filtros } = body;

    if (limit && limit <= 0) {
      throw new BadRequestException('El límite debe ser mayor que 0');
    }
    if (skip && skip < 0) {
      throw new BadRequestException('El salto debe ser mayor o igual a 0');
    }

    return this.usuariosService.paginar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
