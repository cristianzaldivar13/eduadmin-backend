import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CrearProfesoreDto } from './dto/create-profesore.dto';
import { ActualizarProfesoreDto } from './dto/update-profesore.dto';
import { Profesor } from './models/profesor.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectModel(Profesor.name)
    private readonly profesorModel: Model<Profesor>,
  ) {}

  async crearProfesor(crearProfesoreDto: CrearProfesoreDto) {
    if (await this.validaExistencia(crearProfesoreDto)) {
      throw new ConflictException('El profesor ya existe');
    }

    const nuevoGrupo = new this.profesorModel({
      ...crearProfesoreDto,
    });

    return await nuevoGrupo.save();
  }

  async actualizarProfesor(
    id: string,
    actualizarProfesoreDto: ActualizarProfesoreDto,
  ): Promise<Profesor> {
    return this.profesorModel
      .findOneAndUpdate({ _id: id }, actualizarProfesoreDto, { new: true })
      .exec();
  }

  async obtenerProfesoresPaginados(
    _escuelaId: string,
    limit: number,
    skip: number,
  ) {
    // Valida que escuelaId sea un ObjectId válido
    if (!Types.ObjectId.isValid(_escuelaId)) {
      throw new BadRequestException('El ID de la escuela no es válido');
    }

    const escuelaId = new Types.ObjectId(_escuelaId);

    const resultados = await this.profesorModel
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

  private async validaExistencia(crearProfesoreDto: CrearProfesoreDto) {
    return await this.profesorModel
      .findOne({
        escuelaId: new Types.ObjectId(crearProfesoreDto.escuelaId),
        nombre: crearProfesoreDto.nombre,
        apellidoPaterno: crearProfesoreDto.apellidoPaterno,
        apellidoMaterno: crearProfesoreDto.apellidoMaterno,
      })
      .exec();
  }
}
