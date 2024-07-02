import { Module } from '@nestjs/common';
import { CalendarioEscolarService } from './calendario-escolar.service';
import { CalendarioEscolarController } from './calendario-escolar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarioEscolar } from './models/calendario-escolar.model';
import { CalendarioEscolarSchema } from './schemas/calendario-escolar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CalendarioEscolar.name, schema: CalendarioEscolarSchema }]),
  ],
  controllers: [CalendarioEscolarController],
  providers: [CalendarioEscolarService],
})
export class CalendarioEscolarModule {}
