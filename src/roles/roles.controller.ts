import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CrearRolDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('CrearRol')
  async crearRol(@Body() crearRolDto: CrearRolDto) {
    return this.rolesService.crearRol(crearRolDto);
  }
}
