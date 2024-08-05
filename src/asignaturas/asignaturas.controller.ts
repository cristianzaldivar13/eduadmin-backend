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
import { AsignaturasService } from './asignaturas.service';
import { CrearAsignaturaDto } from './dto/crear-asignatura.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { ConsultaDto } from '../utils/dtos/consulta.dto';
import { ActualizarAsignaturaDto } from './dto/actualizar-asignatura.dto';

@ApiTags(EnumSecciones.ASIGNATURAS)
@Controller(EnumSecciones.ASIGNATURAS)
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Post(EnumVerbos.CREAR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.SECRETARIO,
    EnumRolesUsuario.DIRECTOR,
  )
  @UseGuards(JwtAuthGuard, JwtGuard)
  crear(@Body() crearAsignaturaDto: CrearAsignaturaDto) {
    return this.asignaturasService.crear(crearAsignaturaDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async actualizar(
    @Body() actualizarAsignaturaDto: ActualizarAsignaturaDto,
    @Param('id') id: string,
  ) {
    return await this.asignaturasService.actualizar(
      id,
      actualizarAsignaturaDto,
    );
  }

  @Get(EnumVerbos.CONSULTAR_POR_ID)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  consultarPorId(@Param('id') id: string) {
    return this.asignaturasService.consultarPorId(id);
  }

  @Post(EnumVerbos.PAGINAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async paginar(@Body() body: ConsultaDto) {
    const { limit, skip, filtros } = body;

    if (limit && limit <= 0) {
      throw new BadRequestException('El límite debe ser mayor que 0');
    }
    if (skip && skip < 0) {
      throw new BadRequestException('El salto debe ser mayor o igual a 0');
    }

    return this.asignaturasService.paginar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }

  @Post(EnumVerbos.CONSULTAR)
  @Role(
    EnumRolesUsuario.ROOT,
    EnumRolesUsuario.PROFESOR,
    EnumRolesUsuario.DIRECTOR,
    EnumRolesUsuario.SECRETARIO,
  )
  @UseGuards(JwtAuthGuard, JwtGuard)
  async consultar(@Body() body: ConsultaDto) {
    const { limit, skip, filtros } = body;

    if (limit && limit <= 0) {
      throw new BadRequestException('El límite debe ser mayor que 0');
    }
    if (skip && skip < 0) {
      throw new BadRequestException('El salto debe ser mayor o igual a 0');
    }

    return this.asignaturasService.consultar(
      filtros || {}, // Pasa los filtros genéricos
      limit,
      skip,
    );
  }
}
