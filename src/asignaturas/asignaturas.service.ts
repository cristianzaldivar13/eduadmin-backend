import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CrearAsignaturaDto } from './dto/crear-Asignatura.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asignatura } from './models/asignatura.model';

@Injectable()
export class AsignaturasService {
  constructor(
    @InjectModel(Asignatura.name)
    private readonly asignaturaModel: Model<Asignatura>,
  ) {}

  async crear(
    crearAsignaturaDto: CrearAsignaturaDto,
  ): Promise<Asignatura> {
    try {
      const nuevaAsignatura = new this.asignaturaModel(crearAsignaturaDto);
      return await nuevaAsignatura.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async obtenerPorId(id: string) {
    try {
      return await this.asignaturaModel
        .findOne({ _id: new Types.ObjectId(id) })
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async obtener() {
    try {
      return await this.asignaturaModel.find().exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
