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
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@Injectable()
export class GruposService {
  constructor(
    @InjectModel(Grupo.name)
    private readonly grupoModel: Model<Grupo>,
    private readonly paginacionService: PaginacionService,
  ) {}

  async crear(crearGrupoDto: CrearGrupoDto) {
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
      .findOneAndUpdate({ _id: new Types.ObjectId(id) }, actualizarGrupoDto, {
        new: true,
      })
      .exec();
  }

  async consultarPorId(id: string) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'asignaturas',
            localField: 'asignaturas',
            foreignField: '_id',
            as: 'asignaturasDetalles',
          },
        },
        {
          $unwind: '$asignaturasDetalles',
        },
        {
          $lookup: {
            from: 'escuelas',
            localField: 'asignaturasDetalles.escuelaId',
            foreignField: '_id',
            as: 'escuelaDetalles',
          },
        },
        {
          $unwind: '$escuelaDetalles',
        },
        {
          $group: {
            _id: '$_id',
            nombre: { $first: '$nombre' },
            descripcion: { $first: '$descripcion' },
            estatus: { $first: '$estatus' },
            nivel: { $first: '$nivel' },
            asignaturas: {
              $push: {
                _id: '$asignaturasDetalles._id',
                nombre: '$asignaturasDetalles.nombre',
                descripcion: '$asignaturasDetalles.descripcion',
                estatus: '$asignaturasDetalles.estatus',
                nivel: '$asignaturasDetalles.nivel',
              },
            },
            escuela: { $first: '$escuelaDetalles' },
          },
        },
        {
          $project: {
            _id: 1,
            nombre: 1,
            descripcion: 1,
            estatus: 1,
            nivel: 1,
            asignaturas: 1,
            escuela: {
              _id: '$escuela._id',
              nombre: '$escuela.nombre',
              direccion: '$escuela.direccion',
              telefono: '$escuela.telefono',
              correoElectronico: '$escuela.correoElectronico',
              nivelEducativo: '$escuela.nivelEducativo',
              director: '$escuela.director',
              logo: '$escuela.logo',
              website: '$escuela.website',
              fechaFundacion: '$escuela.fechaFundacion',
              ciudad: '$escuela.ciudad',
              codigoPostal: '$escuela.codigoPostal',
              cupo: '$escuela.cupo',
              descripcion: '$escuela.descripcion',
              estatus: '$escuela.estatus',
              fechaCreacion: '$escuela.fechaCreacion',
            },
          },
        },
      ];

      const result = await this.grupoModel.aggregate(pipeline).exec();

      if (result.length === 0) {
        throw new BadRequestException(`El id ${id} no existe.`);
      }

      return result[0];
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar el registro Id. ${error.message}`,
      );
    }
  }

  async paginar(
    filtros: any,
    limit: number,
    skip: number,
    sort: Record<string, 1 | -1> = {}, // Ordenación por defecto vacío
  ) {
    const project = {
      nombre: 1,
      fechaCreacion: 1,
      asignaturas: 1,
    }; // Proyecta solo ciertos campos

    return this.paginacionService.paginar(
      EnumSecciones.GRUPOS.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project, // Resultado
    );
  }
}
