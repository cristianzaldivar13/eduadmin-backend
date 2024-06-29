import { Injectable } from '@nestjs/common';
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
    const nuevaAsistencia = new this.asistenciaModel(crearAsistenciaDto);
    return await nuevaAsistencia.save();
  }

  async obtenerAsistencias(): Promise<Asistencia[]> {
    return await this.asistenciaModel.find().exec();
  }
}
