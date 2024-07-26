import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EscuelasService } from './escuelas.service';
import { CrearEscuelaDto } from './dto/crear-escuela.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { ActualizarEscuelaDto } from './dto/actualizar-escuela.dto';

@ApiTags(EnumSecciones.ESCUELAS)
@Controller(EnumSecciones.ESCUELAS)
export class EscuelasController {
  constructor(private readonly escuelasService: EscuelasService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  crear(@Body() crearEscuelaDto: CrearEscuelaDto) {
    return this.escuelasService.crear(crearEscuelaDto);
  }

  @Post(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  actualizar(
    @Body() actualizarEscuelaDto: ActualizarEscuelaDto,
    @Param('id') id: string,
  ) {
    return this.escuelasService.actualizar(id, actualizarEscuelaDto);
  }
}
