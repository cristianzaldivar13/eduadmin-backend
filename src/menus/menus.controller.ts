import { Body, Controller, Post } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CrearMenuDto } from './dto/crear-menu.dto';

@Controller()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post('createMenu')
  create(@Body() crearMenuDto: CrearMenuDto) {
    return this.menusService.create(crearMenuDto);
  }
}
