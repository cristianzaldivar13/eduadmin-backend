import { Injectable } from '@nestjs/common';
import { CrearCalendarioEscolarDto } from './dto/create-calendario-escolar.dto';
import { CalendarioEscolar } from './models/calendario-escolar.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CalendarioEscolarService {
  constructor(
    @InjectModel(CalendarioEscolar.name)
    private readonly calendarioEscolarModel: Model<CalendarioEscolar>,
  ) {}

  crear(crearCalendarioEscolarDto: CrearCalendarioEscolarDto) {
    try {
      return 'This action adds a new calendarioEscolar';
    } catch (error) {}
  }

  async obtener(
    id: string,
  ): Promise<CalendarioEscolar | null> {
    try {
      return await this.calendarioEscolarModel
        .findOne({ _id: new Types.ObjectId(id) })
        .exec();
    } catch (error) {}
  }
}
