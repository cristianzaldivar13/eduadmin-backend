import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CrearCalificacionDto } from './dto/crear-calificacion.dto';
import { ActualizarCalificacioneDto } from './dto/actualizar-calificacion.dto';
import { Calificacion } from './models/calificacion.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectModel(Calificacion.name)
    private readonly calificacionModel: Model<Calificacion>,
    private readonly paginacionService: PaginacionService,
  ) {}

  async crear(crearCalificacionDto: CrearCalificacionDto) {
    if (await this.validaExistencia(crearCalificacionDto)) {
      throw new ConflictException(
        'Ya ha sido registrada anteriormente esta calificación',
      );
    }

    const nuevaCalificacion = new this.calificacionModel({
      ...crearCalificacionDto,
    });

    return await nuevaCalificacion.save();
  }

  async actualizar(
    id: string,
    actualizarCalificacioneDto: ActualizarCalificacioneDto,
  ): Promise<Calificacion> {
    // Obtiene la calificación actual para preservar usuarioId y escuelaId
    const calificacion = await this.calificacionModel
      .findById(new Types.ObjectId(id))
      .exec();

    if (!calificacion) {
      throw new BadRequestException('Calificación no encontrada');
    }

    return this.calificacionModel
      .findOneAndUpdate({ _id: id }, actualizarCalificacioneDto, { new: true })
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
            from: 'escuelas',
            localField: 'escuelaId',
            foreignField: '_id',
            as: 'escuela',
          },
        },
        {
          $unwind: '$escuela',
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: 'profesorId',
            foreignField: '_id',
            as: 'profesor',
          },
        },
        {
          $unwind: '$profesor',
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: 'estudianteId',
            foreignField: '_id',
            as: 'estudiante',
          },
        },
        {
          $unwind: '$estudiante',
        },
        {
          $lookup: {
            from: 'asignaturas',
            localField: 'asignaturaId',
            foreignField: '_id',
            as: 'asignatura',
          },
        },
        {
          $unwind: '$asignatura',
        },
        {
          $lookup: {
            from: 'grupos',
            localField: 'grupoId',
            foreignField: '_id',
            as: 'grupo',
          },
        },
        {
          $unwind: '$grupo',
        },
        {
          $project: {
            _id: 1,
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
            },
            profesor: {
              _id: '$profesor._id',
              nombre: '$profesor.nombre',
              correo: '$profesor.correo',
              telefono: '$profesor.telefono',
              departamento: '$profesor.departamento',
            },
            estudiante: {
              _id: '$estudiante._id',
              nombre: '$estudiante.nombre',
              apellidoPaterno: '$estudiante.apellidoPaterno',
              apellidoMaterno: '$estudiante.apellidoMaterno',
              fechaNacimiento: '$estudiante.fechaNacimiento',
              sexo: '$estudiante.sexo',
              correo: '$estudiante.correo',
              telefono: '$estudiante.telefono',
            },
            asignatura: {
              _id: '$asignatura._id',
              nombre: '$asignatura.nombre',
              descripcion: '$asignatura.descripcion',
              nivel: '$asignatura.nivel',
            },
            grupo: {
              _id: '$grupo._id',
              nombre: '$grupo.nombre',
              descripcion: '$grupo.descripcion',
              estatus: '$grupo.estatus',
              nivel: '$grupo.nivel',
            },
            periodo: 1,
            tipoEvaluacion: 1,
            calificacion: 1,
            comentarios: 1,
            fechaCreacion: 1,
          },
        },
      ];

      const result = await this.calificacionModel.aggregate(pipeline).exec();

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
      tipoEvaluacion: 1,
      calificacion: 1,
      comentarios: 1,
      fechaCreacion: 1,
    }; // Proyecta solo ciertos campos

    return this.paginacionService.paginar(
      EnumSecciones.CALIFICACIONES.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project, // Resultado
    );
  }

  private async validaExistencia(crearCalificacionDto: CrearCalificacionDto) {
    return await this.calificacionModel
      .findOne({
        escuelaId: new Types.ObjectId(crearCalificacionDto.escuelaId),
        profesorId: new Types.ObjectId(crearCalificacionDto.profesorId),
        estudianteId: new Types.ObjectId(crearCalificacionDto.estudianteId),
        asignaturaId: new Types.ObjectId(crearCalificacionDto.asignaturaId),
        grupoId: new Types.ObjectId(crearCalificacionDto.grupoId),
      })
      .exec();
  }
}
