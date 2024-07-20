import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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

@ApiTags(EnumSecciones.ESTUDIANTES)
@Controller(EnumSecciones.ESTUDIANTES)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post('crearEstudiante')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidaRegistroGuard, ValidarIdsDocumentosGuard, JwtAuthGuard, JwtGuard)
  crearEstudiante(@Body() crearEstudianteDto: CrearEstudianteDto) {
    return this.estudiantesService.crearEstudiante(crearEstudianteDto);
  }
}
