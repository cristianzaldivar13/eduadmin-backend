import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profesor } from './models/profesor.model';
import { ProfesorSchema } from './schemas/profesor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profesor.name, schema: ProfesorSchema },
    ]),
  ],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports: [ProfesoresService],
})
export class ProfesoresModule {}
