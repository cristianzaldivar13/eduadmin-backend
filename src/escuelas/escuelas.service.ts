import { Injectable } from '@nestjs/common';
import { CrearEscuelaDto } from './dto/crear-escuela.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Escuelas } from './models/escuela.model';
import { ActualizarEscuelaDto } from './dto/actualizar-escuela.dto';

@Injectable()
export class EscuelasService {
  constructor(
    @InjectModel(Escuelas.name) private escuelaModel: Model<Escuelas>
  ) {}
  
  async crear(crearEscuelaDto: CrearEscuelaDto) {
    const creadoRol = new this.escuelaModel(crearEscuelaDto);
    return creadoRol.save();
  }

  async actualizar(id: string, actualizarEscuelaDto: ActualizarEscuelaDto) {
    return await this.escuelaModel.findOneAndUpdate(new Types.ObjectId(id), actualizarEscuelaDto);
  }
}
