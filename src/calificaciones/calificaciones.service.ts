import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CrearCalificacionDto } from './dto/create-calificacion.dto';
import { ActualizarCalificacioneDto } from './dto/update-calificacion.dto';
import { Calificacion } from './models/calificacion.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectModel(Calificacion.name)
    private readonly calificacionModel: Model<Calificacion>,
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
