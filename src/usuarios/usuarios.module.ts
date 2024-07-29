import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioSchema } from './schemas/usuario.schema';
import { Usuario } from './models/usuario.model';
import { RolesModule } from '../roles/roles.module';
import { ValidaUsuariosMiddleware } from '../auth/middlewares/valida-usuarios.middleware';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    RolesModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaUsuariosMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.USUARIOS}/Crear`, method: RequestMethod.POST },
        { path: `${EnumSecciones.USUARIOS}/Paginar`, method: RequestMethod.POST },
        { path: `${EnumSecciones.USUARIOS}/Actualizar/:id`, method: RequestMethod.PATCH },
        { path: `${EnumSecciones.USUARIOS}/ConsultarPorId/:id`, method: RequestMethod.GET },
      );
  }
}
