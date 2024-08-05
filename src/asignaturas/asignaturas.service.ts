import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CrearAsignaturaDto } from './dto/crear-Asignatura.dto';
import { ActualizarAsignaturaDto } from './dto/actualizar-asignatura.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asignatura } from './models/asignatura.model';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ConsultasService } from '../utils/servicios/consultas.service';

@Injectable()
export class AsignaturasService {
  constructor(
    @InjectModel(Asignatura.name)
    private readonly asignaturaModel: Model<Asignatura>,
    private readonly consultasService: ConsultasService,
  ) {}

  async crear(crearAsignaturaDto: CrearAsignaturaDto): Promise<Asignatura> {
    try {
      const nuevaAsignatura = new this.asignaturaModel(crearAsignaturaDto);
      return await nuevaAsignatura.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async actualizar(
    id: string,
    actualizarAsignaturaDto: ActualizarAsignaturaDto,
  ) {
    return await this.asignaturaModel.findOneAndUpdate(
      new Types.ObjectId(id),
      actualizarAsignaturaDto,
    );
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
          $project: {
            _id: 1,
            nombre: '$nombre',
            descripcion: '$descripcion',
            estatus: '$estatus',
            nivel: '$nivel',
            escuela: {
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
          },
        },
      ];
      return await this.asignaturaModel.aggregate(pipeline).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async paginar(
    filtros: any,
    limit: number,
    skip: number,
    sort: Record<string, 1 | -1> = {}, // Ordenación por defecto vacío
  ) {
    const project = {
      escuelaId: 1,
      nombre: 1,
      descripcion: 1,
      estatus: 1,
      nivel: 1,
      fechaCreacion: 1,
    }; // Proyecta solo ciertos campos

    return this.consultasService.paginar(
      EnumSecciones.ASIGNATURAS.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project, // Resultado
    );
  }

  async consultar(
    filtros: any,
    limit: number,
    skip: number,
    sort: Record<string, 1 | -1> = {}, // Ordenación por defecto vacío
  ) {
    let project: {
      _id: 1,
      nombre: 1,
    }
    return this.consultasService.Consultar(
      EnumSecciones.ASIGNATURAS.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project,
    );
  }
}
