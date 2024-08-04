import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioSchema } from './schemas/usuario.schema';
import { Usuario } from './models/usuario.model';
import { RolesModule } from '../roles/roles.module';
import { ValidaUsuariosMiddleware } from '../auth/middlewares/valida-usuarios.middleware';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumVerbos } from '../utils/enums/verbos.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    RolesModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, PaginacionService],
  exports: [UsuariosService],
})
export class UsuariosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaUsuariosMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.USUARIOS}/${EnumVerbos.CREAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.USUARIOS}/${EnumVerbos.PAGINAR}`, method: RequestMethod.POST },
        { path: `${EnumSecciones.USUARIOS}/${EnumVerbos.ACTUALIZAR}`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.USUARIOS}/${EnumVerbos.CONSULTAR_POR_ID}`, method: RequestMethod.GET },
        { path: `${EnumSecciones.USUARIOS}/${EnumVerbos.LISTAR}`, method: RequestMethod.GET },
      );
  }
}
