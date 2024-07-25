// asistencias.controller.ts

import { Controller, Get, Post, Body, UseGuards, Req, Query, ParseIntPipe, Patch } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CrearAsistenciaDto } from './dto/crear-asistencia.dto';
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
  @Role(EnumRolesUsuario.ROOT, EnumRolesUsuario.PROFESOR, EnumRolesUsuario.ESTUDIANTE)
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
  @Role(EnumRolesUsuario.ROOT, EnumRolesUsuario.PROFESOR, EnumRolesUsuario.ESTUDIANTE)
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
  @Role(EnumRolesUsuario.ROOT, EnumRolesUsuario.PROFESOR, EnumRolesUsuario.ESTUDIANTE)
  @UseGuards(
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async actualizarQr(@Body() QR: any) {
    return await this.asistenciasService.actualizarQr(QR);
  }

  @Get(EnumVerbos.PAGINAR)
  @Role(EnumRolesUsuario.ROOT, EnumRolesUsuario.PROFESOR)
  async obtenerPaginadas(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('escuelaId') escuelaId?: string,
    @Query('escuelaId') grupoId?: string,
  ) {
    return await this.asistenciasService.obtenerPaginadas(
      escuelaId,
      grupoId,
      limit,
      skip,
    );
  }
}
