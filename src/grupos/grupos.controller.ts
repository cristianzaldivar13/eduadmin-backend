import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CrearGrupoDto } from './dto/crear-grupo.dto';
import { ActualizarGrupoDto } from './dto/actualizar-grupo.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { PaginacionDto } from '../utils/dtos/paginacion.dto';

@ApiTags(EnumSecciones.GRUPOS)
@Controller(EnumSecciones.GRUPOS)
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  crear(@Body() crearGrupoDto: CrearGrupoDto) {
    return this.gruposService.crear(crearGrupoDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  actualizar(
    @Body() actualizarGrupoDto: ActualizarGrupoDto,
    @Param('id') id: string,
  ) {
    return this.gruposService.actualizar(id, actualizarGrupoDto);
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

    return this.gruposService.paginar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
