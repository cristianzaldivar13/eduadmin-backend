import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CrearAsignaturaDto } from './dto/crear-Asignatura.dto';
import { ActualizarAsignaturaDto } from './dto/actualizar-asignatura.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asignatura } from './models/asignatura.model';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { PaginacionService } from '../utils/servicios/paginacion.service';

@Injectable()
export class AsignaturasService {
  constructor(
    @InjectModel(Asignatura.name)
    private readonly asignaturaModel: Model<Asignatura>,
    private readonly paginacionService: PaginacionService,
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

  async obtenerPorId(id: string) {
    try {
      return await this.asignaturaModel
        .findOne({ _id: new Types.ObjectId(id) })
        .exec();
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

    return this.paginacionService.paginar(
      EnumSecciones.ASIGNATURAS.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project, // Resultado
    );
  }
}
