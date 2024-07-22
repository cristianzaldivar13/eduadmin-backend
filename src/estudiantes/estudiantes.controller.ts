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
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';
import { ValidaRegistroGuard } from '../auth/guardians/valida-registro.guard';
import { Estudiante } from './models/estudiante.model';
import { ActualizarEstudianteDto } from './dto/update-estudiante.dto';

@ApiTags(EnumSecciones.ESTUDIANTES)
@Controller(EnumSecciones.ESTUDIANTES)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post('Crear')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async crearEstudiante(@Body() crearEstudianteDto: CrearEstudianteDto) {
    return await this.estudiantesService.crearEstudiante(crearEstudianteDto);
  }

  @Patch('Actualizar/:id')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async actualizarEstudiante(
    @Body() actualizarEstudianteDto: ActualizarEstudianteDto,
    @Param('id') id: string,
  ) {
    return await this.estudiantesService.actualizarEstudiante(
      id,
      actualizarEstudianteDto,
    );
  }

  @Get('Paginados')
  async obtenerEstudiantesPaginados(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('escuelaId') escuelaId?: string,
  ): Promise<{ data: Estudiante[]; total: number }> {
    return await this.estudiantesService.obtenerEstudiantesPaginados(
      escuelaId,
      limit,
      skip,
    );
  }
}
