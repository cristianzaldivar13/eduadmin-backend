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
import { ValidaRegistroGuard } from '../auth/guardians/valida-registro.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';
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
  @UseGuards(
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async crear(@Body() crearAsistenciaDto: CrearAsistenciaDto) {
    return await this.asistenciasService.crear(crearAsistenciaDto);
  }

  @Post(EnumVerbos.CREAR_QR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.PROFESOR,
    EnumRolesUsuario.ESTUDIANTE,
  )
  @UseGuards(
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
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
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async actualizarQr(@Body() QR: any) {
    return await this.asistenciasService.actualizarQr(QR);
  }

  @Post(EnumVerbos.PAGINAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
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
