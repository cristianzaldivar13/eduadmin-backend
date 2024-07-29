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
      .findOneAndUpdate({ _id: new Types.ObjectId(id) }, actualizarGrupoDto, {
        new: true,
      })
      .exec();
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
      nombreAsignatura: '$asignaturasDetalles.nombre'
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
