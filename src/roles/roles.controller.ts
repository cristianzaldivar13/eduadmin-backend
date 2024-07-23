import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CrearRolDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/guardians/jwt-auth.guard'
import { JwtGuard } from '../auth/guardians/jwt.guard';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@ApiTags(EnumSecciones.ROLES)
@Controller(EnumSecciones.ROLES)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post(EnumVerbos.CREAR)
  @Role(EnumRolesUsuario.ROOT)
  @UseGuards(JwtAuthGuard, JwtGuard)
  async crear(@Body() crearRolDto: CrearRolDto) {
    return this.rolesService.crear(crearRolDto);
  }
}
