import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Asistencia } from './models/asistencia.model';
import { CrearAsistenciaDto } from './dto/create-asistencia.dto';
import { TipoAsistencia } from 'src/enums/tipos';

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
      throw new BadRequestException(error.message);
    }
  }

  async obtenerAsistencias(): Promise<Asistencia[]> {
    try {
      return await this.asistenciaModel.find().exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async obtenerAsistenciaDelDia(usuarioId: string, tipo: TipoAsistencia): Promise<Asistencia[]> {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      return await this.asistenciaModel.find({
        fecha: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        usuarioId: new mongoose.Types.ObjectId(usuarioId),
        tipo: tipo,
      }).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
