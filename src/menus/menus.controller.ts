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
import { MenusService } from './menus.service';
import { CrearMenuDto } from './dto/crear-menu.dto';
import { ActualizarMenuDto } from './dto/actualizar-menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { PaginacionDto } from '../utils/dtos/paginacion.dto';

@ApiTags(EnumSecciones.MENUS)
@Controller(EnumSecciones.MENUS)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  crear(@Body() CrearMenuDto: CrearMenuDto) {
    return this.menusService.crear(CrearMenuDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async actualizar(
    @Body() actualizarMenuDto: ActualizarMenuDto,
    @Param('id') id: string,
  ) {
    return await this.menusService.actualizar(id, actualizarMenuDto);
  }

  @Get(EnumVerbos.CONSULTAR_POR_ID)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  consultarPorId(@Param('id') id: string) {
    return this.menusService.consultarPorId(id);
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

    return this.menusService.paginar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
