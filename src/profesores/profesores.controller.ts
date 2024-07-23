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
import { ProfesoresService } from './profesores.service';
import { CrearProfesoreDto } from './dto/create-profesore.dto';
import { ActualizarProfesoreDto } from './dto/update-profesore.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { ValidaRegistroGuard } from '../auth/guardians/valida-registro.guard';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@ApiTags(EnumSecciones.PROFESORES)
@Controller(EnumSecciones.PROFESORES)
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidaRegistroGuard,
    ValidarIdsDocumentosGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  crearProfesor(@Body() crearProfesoreDto: CrearProfesoreDto) {
    return this.profesoresService.crearProfesor(crearProfesoreDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaRegistroGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  actualizarProfesor(
    @Body() actualizarProfesoreDto: ActualizarProfesoreDto,
    @Param('id') id: string,
  ) {
    return this.profesoresService.actualizarProfesor(
      id,
      actualizarProfesoreDto,
    );
  }

  @Get(EnumVerbos.PAGINAR)
  obtenerProfesoresPaginados(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('escuelaId') escuelaId?: string,
  ) {
    return this.profesoresService.obtenerProfesoresPaginados(
      escuelaId,
      limit,
      skip,
    );
  }
}
