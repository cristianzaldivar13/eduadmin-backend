import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu } from './models/menu.model';
import { MenuSchema } from './schemas/menu.schema';
import { ConsultasService } from '../utils/servicios/consultas.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaMenusMiddleware } from '../auth/middlewares/valida-menus.middleware';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  controllers: [MenusController],
  providers: [MenusService, ConsultasService],
  exports: [MenusService],
})
export class MenusModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaMenusMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.MENUS}/${EnumVerbos.CREAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.MENUS}/${EnumVerbos.PAGINAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.MENUS}/${EnumVerbos.ACTUALIZAR}`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.MENUS}/${EnumVerbos.CONSULTAR_POR_ID}`, method: RequestMethod.GET },
        { path: `${EnumSecciones.MENUS}/${EnumVerbos.LISTAR}`, method: RequestMethod.GET },
      );
  }
}
