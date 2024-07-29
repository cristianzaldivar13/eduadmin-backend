import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu } from './models/menu.model';
import { MenuSchema } from './schemas/menu.schema';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaMenusMiddleware } from '../auth/middlewares/valida-menus.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  controllers: [MenusController],
  providers: [MenusService, PaginacionService],
  exports: [MenusService],
})
export class MenusModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaMenusMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.MENUS}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.MENUS}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.MENUS}/Actualizar/:id`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.MENUS}/ConsultarPorId/:id`, method: RequestMethod.GET },
      );
  }
}
