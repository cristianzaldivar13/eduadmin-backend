import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu } from './models/menu.model';
import { MenuSchema } from './schemas/menu.schema';
import { PaginacionService } from '../utils/servicios/paginacion.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  controllers: [MenusController],
  providers: [MenusService, PaginacionService],
  exports: [MenusService],
})
export class MenusModule {}
