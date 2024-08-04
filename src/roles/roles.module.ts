import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './models/roles.model';
import { RolesSchema } from './schemas/rol.schema';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ValidaRolesMiddleware } from '../auth/middlewares/valida-roles.middleware';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], 
})
export class RolesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaRolesMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.ROLES}/${EnumVerbos.CREAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ROLES}/${EnumVerbos.PAGINAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.ROLES}/${EnumVerbos.ACTUALIZAR}`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.ROLES}/${EnumVerbos.CONSULTAR_POR_ID}`, method: RequestMethod.GET },
        { path: `${EnumSecciones.ROLES}/${EnumVerbos.LISTAR}`, method: RequestMethod.GET },
      );
  }
}
