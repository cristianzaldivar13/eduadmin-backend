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
    const nuevoEstudiante = new this.estudianteModel({
      ...crearEstudianteDto,
    });

    return await nuevoEstudiante.save();
  }

  async actualizarEstudiante(
    id: string,
    dto: ActualizarEstudianteDto,
  ): Promise<Estudiante> {
    // Obtiene el estudiante actual para preservar usuarioId y escuelaId
    const estudiante = await this.estudianteModel.findById(id).exec();
    if (!estudiante) {
      throw new Error('Estudiante no encontrado');
    }

    // Actualiza solo los campos permitidos
    const camposActualizables = { ...dto };
    delete camposActualizables.usuarioId;
    delete camposActualizables.escuelaId;

    return this.estudianteModel
      .findByIdAndUpdate(id, camposActualizables, { new: true })
      .exec();
  }
}
