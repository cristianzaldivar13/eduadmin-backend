import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asistencia } from './models/asistencia.model';
import { CrearAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectModel(Asistencia.name) private readonly asistenciaModel: Model<Asistencia>,
  ) {}

  async crearAsistencia(
    crearAsistenciaDto: CrearAsistenciaDto,
  ): Promise<Asistencia> {
    try {
      const nuevaAsistencia = new this.asistenciaModel(crearAsistenciaDto);
      return await nuevaAsistencia.save();
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async obtenerAsistencias(): Promise<Asistencia[]> {
    return await this.asistenciaModel.find().exec();
  }
}
