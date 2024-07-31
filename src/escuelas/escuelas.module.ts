import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EscuelasService } from './escuelas.service';
import { EscuelasController } from './escuelas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Escuelas } from './models/escuela.model';
import { EscuelaSchema } from './schemas/escuela.schema';
import { ValidaEscuelasMiddleware } from '../auth/middlewares/valida-escuelas.middleware';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Escuelas.name, schema: EscuelaSchema }]),
  ],
  controllers: [EscuelasController],
  providers: [EscuelasService],
  exports: [EscuelasService],
})
export class EscuelasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidaEscuelasMiddleware)
      .forRoutes(
        { path: `${EnumSecciones.ESCUELAS}/ConsultarPorId/:id`, method: RequestMethod.GET },
      );
  }
}
