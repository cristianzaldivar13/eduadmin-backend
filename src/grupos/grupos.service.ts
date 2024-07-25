import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CrearGrupoDto } from './dto/crear-grupo.dto';
import { ActualizarGrupoDto } from './dto/actualizar-grupo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Grupo } from './models/grupo.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class GruposService {
  constructor(
    @InjectModel(Grupo.name)
    private readonly grupoModel: Model<Grupo>,
  ) {}

  async crear(crearGrupoDto: CrearGrupoDto) {
    if (await this.validaExistencia(crearGrupoDto)) {
      throw new ConflictException('El estudiante ya existe');
    }

    const nuevoGrupo = new this.grupoModel({
      ...crearGrupoDto,
    });

    return await nuevoGrupo.save();
  }

  async actualizar(
    id: string,
    actualizarGrupoDto: ActualizarGrupoDto,
  ): Promise<Grupo> {
    return this.grupoModel
      .findOneAndUpdate({ _id: id }, actualizarGrupoDto, { new: true })
      .exec();
  }

  async obtenerPaginados(
    _escuelaId: string,
    limit: number,
    skip: number,
  ) {
    // Valida que escuelaId sea un ObjectId válido
    if (!Types.ObjectId.isValid(_escuelaId)) {
      throw new BadRequestException('El ID de la escuela no es válido');
    }

    const escuelaId = new Types.ObjectId(_escuelaId);

    const resultados = await this.grupoModel
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

  private async validaExistencia(crearGrupoDto: CrearGrupoDto) {
    return await this.grupoModel
      .findOne({
        escuelaId: new Types.ObjectId(crearGrupoDto.escuelaId),
        nombre: crearGrupoDto.nombre,
        asignaturas: crearGrupoDto.asignaturas,
      })
      .exec();
  }
}
