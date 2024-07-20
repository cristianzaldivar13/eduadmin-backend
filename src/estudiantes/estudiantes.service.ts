import { Injectable } from '@nestjs/common';
import { CrearEstudianteDto } from './dto/create-estudiante.dto';
import { ActualizarEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './models/estudiante.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
  ) {}

  async crearEstudiante(crearEstudianteDto: CrearEstudianteDto) {
    // Convierte usuarioId a ObjectId
    const usuarioId = new Types.ObjectId(crearEstudianteDto.usuarioId);

    // Convierte escuelaId a ObjectId
    const escuelaId = new Types.ObjectId(crearEstudianteDto.escuelaId);

    const nuevoEstudiante = new this.estudianteModel({
      ...crearEstudianteDto,
      usuarioId,
      escuelaId,
    });

    return await nuevoEstudiante.save();
  }

  async actualizarEstudiante(actualizarEstudianteDto: ActualizarEstudianteDto) {
    
  }
}
