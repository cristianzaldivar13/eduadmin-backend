// asistencias.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CrearAsistenciaDto } from './dto/crear-asistencia.dto';
import { PaginacionDto } from '../utils/dtos/paginacion.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { Role } from '../auth/decorators/Role.decorator';

@ApiTags(EnumSecciones.ASISTENCIAS)
@Controller(EnumSecciones.ASISTENCIAS)
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post(EnumVerbos.CREAR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.PROFESOR,
    EnumRolesUsuario.ESTUDIANTE,
  )
  @UseGuards(JwtAuthGuard, JwtGuard)
  async crear(@Body() crearAsistenciaDto: CrearAsistenciaDto) {
    return await this.asistenciasService.crear(crearAsistenciaDto);
  }

  @Post(EnumVerbos.CREAR_QR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.PROFESOR,
    EnumRolesUsuario.ESTUDIANTE,
  )
  @UseGuards(JwtAuthGuard, JwtGuard)
  async crearQr(@Body() QR: any) {
    return await this.asistenciasService.crearQr(QR);
  }

  @Patch(EnumVerbos.ACTUALIZAR_QR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.PROFESOR,
    EnumRolesUsuario.ESTUDIANTE,
  )
  @UseGuards(
    JwtAuthGuard,
    JwtGuard,
  )
  async actualizarQr(@Body() QR: any) {
    return await this.asistenciasService.actualizarQr(QR);
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

    return this.asistenciasService.paginar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
