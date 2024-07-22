import {
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
import { CrearGrupoDto } from './dto/create-grupo.dto';
import { ActualizarGrupoDto } from './dto/update-grupo.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { ValidaRegistroGuard } from '../auth/guardians/valida-registro.guard';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';

@ApiTags(EnumSecciones.GRUPOS)
@Controller(EnumSecciones.GRUPOS)
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post('Crear')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  crearGrupo(@Body() CrearGrupoDto: CrearGrupoDto) {
    return this.gruposService.crearGrupo(CrearGrupoDto);
  }

  @Patch('Actualizar/:id')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  actualizarGrupo(
    @Body() ActualizarGrupoDto: ActualizarGrupoDto,
    @Param('id') id: string,
  ) {
    return this.gruposService.actualizarGrupo(id, ActualizarGrupoDto);
  }

  @Get('Paginados')
  obtenerGruposPaginados(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('escuelaId') escuelaId?: string,
  ) {
    return this.gruposService.obtenerGruposPaginados(escuelaId, limit, skip);
  }
}
