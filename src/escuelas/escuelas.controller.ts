import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EscuelasService } from './escuelas.service';
import { CrearEscuelaDto } from './dto/create-escuela.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { ValidaIdDocumentoGuard } from '../auth/guardians/valida-Id-documento.guard';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { Role } from '../auth/decorators/Role.decorator';
import { ActualizarEscuelaDto } from './dto/update-escuela.dto';

@ApiTags(EnumSecciones.ESCUELAS)
@Controller(EnumSecciones.ESCUELAS)
export class EscuelasController {
  constructor(private readonly escuelasService: EscuelasService) {}

  @Post('CrearEscuela')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  crearEscuela(@Body() crearEscuelaDto: CrearEscuelaDto) {
    return this.escuelasService.crearEscuela(crearEscuelaDto);
  }

  @Patch('ActualizarEscuela/:id')
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidaIdDocumentoGuard, JwtAuthGuard, JwtGuard)
  actualizarEscuela(
    @Body() actualizarEscuelaDto: ActualizarEscuelaDto,
    @Param('id') id: string,
  ) {
    return this.escuelasService.actualizarEscuela(id, actualizarEscuelaDto);
  }
}
