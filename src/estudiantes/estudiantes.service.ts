import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CrearEstudianteDto } from './dto/create-estudiante.dto';
import { ActualizarEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './models/estudiante.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { string } from '@tensorflow/tfjs-node';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
  ) {}

  async crearEstudiante(crearEstudianteDto: CrearEstudianteDto) {
    if (await this.validaExistencia(crearEstudianteDto)) {
      throw new ConflictException('El estudiante ya existe');
    }

    const nuevoEstudiante = new this.estudianteModel({
      ...crearEstudianteDto,
    });

    return await nuevoEstudiante.save();
  }

  async actualizarEstudiante(
    id: string,
    actualizarEstudianteDto: ActualizarEstudianteDto,
  ): Promise<Estudiante> {
    // Obtiene el estudiante actual para preservar usuarioId y escuelaId
    const estudiante = await this.estudianteModel
      .findById(new Types.ObjectId(id))
      .exec();

    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    return this.estudianteModel
      .findOneAndUpdate({ _id: id }, actualizarEstudianteDto, { new: true })
      .exec();
  }

  async obtenerEstudiantesPaginados(
    _escuelaId: string,
    limit: number,
    skip: number,
  ) {
    // Valida que escuelaId sea un ObjectId válido
    if (!Types.ObjectId.isValid(_escuelaId)) {
      throw new BadRequestException('El ID de la escuela no es válido');
    }

    const escuelaId = new Types.ObjectId(_escuelaId);

    const resultados = await this.estudianteModel
      .aggregate([
        {
          $match: {
            escuelaId,
          },
        },
        {
          $facet: {
            resultados: [{ $skip: skip }, { $limit: limit }],
            total: [{ $count: 'total' }],
          },
        },
        {
          $addFields: {
            total: { $arrayElemAt: ['$total.total', 0] },
            pagina: { $literal: Math.floor(skip / limit) + 1 },
            tamanoPagina: { $size: '$resultados' },
          },
        },
      ])
      .exec();

    return (
      resultados[0] || {
        total: 0,
        pagina: 1,
        tamanoPagina: 0,
        resultados: [],
      }
    );
  }

  private async validaExistencia(crearEstudianteDto: CrearEstudianteDto) {
    return await this.estudianteModel
      .findOne({
        escuelaId: new Types.ObjectId(crearEstudianteDto.escuelaId),
        nombre: crearEstudianteDto.nombre,
        apellidoPaterno: crearEstudianteDto.apellidoPaterno,
        apellidoMaterno: crearEstudianteDto.apellidoMaterno,
      })
      .exec();
  }
}
