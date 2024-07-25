import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { CrearAsignaturaDto } from './dto/crear-asignatura.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';

@ApiTags(EnumSecciones.ASIGNATURAS)
@Controller(EnumSecciones.ASIGNATURAS)
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT, EnumRolesUsuario.SECRETARIO, EnumRolesUsuario.DIRECTOR)
  @UseGuards(ValidarIdsDocumentosGuard, JwtAuthGuard, JwtGuard)
  crear(@Body() crearAsignaturaDto: CrearAsignaturaDto) {
    return this.asignaturasService.crear(crearAsignaturaDto);
  }

  @Get(EnumVerbos.CONSULTAR_POR_ID)
  obtenerPorId(@Param('id') id: string) {
    return this.asignaturasService.obtenerPorId(id);
  }

  @Get(EnumVerbos.CONSULTAR)
  obtener() {
    return this.asignaturasService.obtener();
  }
}
