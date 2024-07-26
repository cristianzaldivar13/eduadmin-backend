import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { ActualizarCalificacioneDto } from './dto/actualizar-calificacion.dto';
import { CrearCalificacionDto } from './dto/crear-calificacion.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { PaginacionDto } from '../utils/dtos/paginacion.dto';

@ApiTags(EnumSecciones.CALIFICACIONES)
@Controller(EnumSecciones.CALIFICACIONES)
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  crear(@Body() createCalificacioneDto: CrearCalificacionDto) {
    return this.calificacionesService.crear(createCalificacioneDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async actualizar(
    @Body() actualizarCalificacioneDto: ActualizarCalificacioneDto,
    @Param('id') id: string,
  ) {
    return await this.calificacionesService.actualizar(
      id,
      actualizarCalificacioneDto,
    );
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

    return this.calificacionesService.paginar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
