import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { ActualizarCalificacioneDto } from './dto/update-calificacion.dto';
import { CrearCalificacionDto } from './dto/create-calificacion.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';
import { ValidaRegistroGuard } from '../auth/guardians/valida-registro.guard';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { ValidaIdDocumentoGuard } from '../auth/guardians/valida-Id-documento.guard';
import { PaginacionDto } from '../utils/dtos/paginacion.dto';

@ApiTags(EnumSecciones.CALIFICACIONES)
@Controller(EnumSecciones.CALIFICACIONES)
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  crear(@Body() createCalificacioneDto: CrearCalificacionDto) {
    return this.calificacionesService.crear(createCalificacioneDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidaIdDocumentoGuard, JwtAuthGuard, JwtGuard)
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
  async obtenerPaginados(@Body() body: PaginacionDto) {
    const { limit, skip, filtros } = body;

    if (limit && limit <= 0) {
      throw new BadRequestException('El límite debe ser mayor que 0');
    }
    if (skip && skip < 0) {
      throw new BadRequestException('El salto debe ser mayor o igual a 0');
    }

    return this.calificacionesService.obtenerPaginados(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
