import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ValidaRolGuard } from '../auth/guardians/valida-rol.guard';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard';
import { Role } from '../auth/decorators/Role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { ValidaIdDocumentoGuard } from '../auth/guardians/valida-Id-documento.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';
import { ActualizarUsuarioDto } from './dto/update-usuario.dto';
import { ValidarIdsDocumentosGuard } from '../auth/guardians/validar-ids-documentos-guard';

@ApiTags(EnumSecciones.USUARIOS)
@Controller(EnumSecciones.USUARIOS)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(ValidarIdsDocumentosGuard, ValidaRolGuard, JwtAuthGuard, JwtGuard)
  async crearUsuario(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crearUsuario(crearUsuarioDto);
  }

  @Patch(EnumVerbos.ACTUALIZAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(
    ValidarIdsDocumentosGuard,
    ValidaIdDocumentoGuard,
    JwtAuthGuard,
    JwtGuard,
  )
  async ActualizarUsuario(
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
    @Param('id') id: string,
  ) {
    return await this.usuariosService.actualizarUsuario(
      id,
      actualizarUsuarioDto,
    );
  }
}
