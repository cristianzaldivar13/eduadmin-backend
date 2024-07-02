import { Injectable } from '@nestjs/common';
import { CrearCalendarioEscolarDto } from './dto/create-calendario-escolar.dto';
import { CalendarioEscolar } from './models/calendario-escolar.model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CalendarioEscolarService {
  constructor(
    @InjectModel(CalendarioEscolar.name)
    private readonly calendarioEscolarModel: Model<CalendarioEscolar>,
  ) {}

  crearCalendarioEscolar(crearCalendarioEscolarDto: CrearCalendarioEscolarDto) {
    try {
      return 'This action adds a new calendarioEscolar';
    } catch (error) {}
  }

  async obtenerCalendarioEscolar(
    id: string,
  ): Promise<CalendarioEscolar | null> {
    try {
      return await this.calendarioEscolarModel
        .findOne({ _id: new mongoose.Types.ObjectId(id) })
        .exec();
    } catch (error) {}
  }
}