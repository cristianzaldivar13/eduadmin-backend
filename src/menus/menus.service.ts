import { Injectable } from '@nestjs/common';
import { CrearMenuDto } from './dto/crear-menu.dto';
import { ActualizarMenuDto } from './dto/actualizar-menu.dto';

@Injectable()
export class MenusService {
  create(createMenuDto: CrearMenuDto) {
    return 'This action adds a new menu';
  }

  findAll() {
    return `This action returns all menus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, actualizarMenuDto: ActualizarMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
