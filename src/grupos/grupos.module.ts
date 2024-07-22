import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grupo } from './models/grupo.model';
import { GrupoSchema } from './schemas/grupo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Grupo.name, schema: GrupoSchema },
    ]),
  ],
  controllers: [GruposController],
  providers: [GruposService],
  exports: [GruposService],
})
export class GruposModule {}
