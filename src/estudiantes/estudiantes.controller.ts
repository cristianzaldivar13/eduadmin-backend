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
import { EstudiantesService } from './estudiantes.service';
import { CrearEstudianteDto } from './dto/create-estudiante.dto';
import { ActualizarEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './models/estudiante.model';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';
import { ValidaRegistroGuard } from '../auth/guardians/valida-registro.guard';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@ApiTags(EnumSecciones.ESTUDIANTES)
@Controller(EnumSecciones.ESTUDIANTES)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async crear(@Body() crearEstudianteDto: CrearEstudianteDto) {
    return await this.estudiantesService.crear(crearEstudianteDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async actualizar(
    @Body() actualizarEstudianteDto: ActualizarEstudianteDto,
    @Param('id') id: string,
  ) {
    return await this.estudiantesService.actualizar(
      id,
      actualizarEstudianteDto,
    );
  }

  @Get(EnumVerbos.PAGINAR)
  async obtenerPaginados(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('escuelaId') escuelaId?: string,
  ): Promise<{ data: Estudiante[]; total: number }> {
    return await this.estudiantesService.obtenerPaginados(
      escuelaId,
      limit,
      skip,
    );
  }
}
