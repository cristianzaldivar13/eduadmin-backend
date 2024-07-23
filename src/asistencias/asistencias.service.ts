import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Asistencia } from './models/asistencia.model';
import { CrearAsistenciaDto } from './dto/create-asistencia.dto';
import { ActualizarAsistenciaDto } from './dto/update-asistencia.dto';
import { EnumTipoAsistencia } from '../utils/enums/tipos.enum';
import { Buffer } from 'buffer';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectModel(Asistencia.name)
    private readonly asistenciaModel: Model<Asistencia>,
  ) {}

  async crear(crearAsistenciaDto: CrearAsistenciaDto): Promise<Asistencia> {
    try {
      const nuevaAsistencia = new this.asistenciaModel(crearAsistenciaDto);
      return await nuevaAsistencia.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async crearQr(QR: any): Promise<Asistencia> {
    try {
      // Decodifica el QR base64 y extrae los datos JSON
      const qrData = await this.leerQrDesdeBase64(QR.qr);

      // Asegúrate de que qrData es un objeto y contiene los datos esperados
      if (typeof qrData !== 'object' || qrData === null) {
        throw new Error('El contenido del QR no es un JSON válido');
      }

      let crearAsistenciaDto: CrearAsistenciaDto = qrData;
      crearAsistenciaDto.ingreso = true;
      crearAsistenciaDto.egreso = false;
      crearAsistenciaDto.tipoAsistencia = EnumTipoAsistencia.ESCUELA;

      const asistencia = await this.asistenciaModel.find({
        usuarioId: new Types.ObjectId(crearAsistenciaDto.usuarioId),
        escuelaId: new Types.ObjectId(crearAsistenciaDto.escuelaId),
        ingreso: crearAsistenciaDto.ingreso,
        egreso: crearAsistenciaDto.egreso,
      });

      if (asistencia.length) {
        throw new ConflictException('El registro de ingreso ya existe');
      }

      // Crea una nueva instancia de asistencia y guárdala
      const nuevaAsistencia = new this.asistenciaModel(crearAsistenciaDto);
      return await nuevaAsistencia.save();
    } catch (error) {
      throw new BadRequestException(
        'Error al crear la asistencia: ' + error.message,
      );
    }
  }

  async actualizarQr(QR: any): Promise<Asistencia> {
    try {
      // Decodifica el QR base64 y extrae los datos JSON
      const qrData = await this.leerQrDesdeBase64(QR.qr);

      // Asegúrate de que qrData es un objeto y contiene los datos esperados
      if (typeof qrData !== 'object' || qrData === null || !qrData.usuarioId) {
        throw new Error(
          'El contenido del QR no es un JSON válido o falta el usuarioId',
        );
      }

      // Define los datos de actualización
      let actualizarAsistenciaDto: ActualizarAsistenciaDto = {
        ...qrData,
        egreso: false,
        ingreso: true,
      };

      const asistencia = await this.asistenciaModel.find({
        usuarioId: new Types.ObjectId(actualizarAsistenciaDto.usuarioId),
        escuelaId: new Types.ObjectId(actualizarAsistenciaDto.escuelaId),
        ingreso: actualizarAsistenciaDto.ingreso,
        egreso: actualizarAsistenciaDto.egreso,
      });

      if (!asistencia.length) {
        throw new ConflictException('El registro de ingreso no existe');
      }

      actualizarAsistenciaDto.egreso = true;
      actualizarAsistenciaDto.tipoAsistencia = EnumTipoAsistencia.ESCUELA;

      // Actualiza la asistencia
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const mesActual = (fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, '0'); // Los meses en JavaScript son 0-indexados
      const diaActual = fechaActual.getDate().toString().padStart(2, '0');
      const updatedAsistencia = await this.asistenciaModel
        .findOneAndUpdate(
          {
            usuarioId: new Types.ObjectId(actualizarAsistenciaDto.usuarioId),
            escuelaId: new Types.ObjectId(actualizarAsistenciaDto.escuelaId),
            ingreso: actualizarAsistenciaDto.ingreso,
            egreso: false,
            $expr: {
              $and: [
                { $eq: [{ $year: '$fechaCreacion' }, añoActual] },
                { $eq: [{ $month: '$fechaCreacion' }, mesActual] },
                { $eq: [{ $dayOfMonth: '$fechaCreacion' }, diaActual] },
              ],
            },
          },
          actualizarAsistenciaDto,
        )
        .exec();

      // Verifica si se actualizó el documento
      if (!updatedAsistencia) {
        throw new BadRequestException(
          'No se encontró la asistencia para actualizar',
        );
      }

      return updatedAsistencia;
    } catch (error) {
      throw new BadRequestException(
        'Error al actualizar la asistencia: ' + error.message,
      );
    }
  }

  async obtenerPaginadas(
    _escuelaId: string,
    _grupoId: string,
    limit: number,
    skip: number,
  ) {
    // Valida que escuelaId sea un ObjectId válido
    if (!Types.ObjectId.isValid(_escuelaId)) {
      throw new BadRequestException('El ID de la escuela no es válido');
    }

    // Valida que grupoId sea un ObjectId válido
    if (!Types.ObjectId.isValid(_grupoId)) {
      throw new BadRequestException('El ID del grupo no es válido');
    }

    const escuelaId = new Types.ObjectId(_escuelaId);
    const grupoId = new Types.ObjectId(_grupoId);

    const resultados = await this.asistenciaModel
      .aggregate([
        {
          $match: {
            escuelaId,
            grupoId,
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

  async obtenerAsistenciaDelDia(
    usuarioId: string,
    ingreso?: boolean,
    egreso?: boolean,
  ): Promise<Asistencia[]> {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Objeto de consulta dinámica
      const query: any = {
        fecha: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        usuarioId: new Types.ObjectId(usuarioId),
      };

      if (ingreso !== undefined) {
        query.ingreso = ingreso;
      }

      if (egreso !== undefined) {
        query.egreso = egreso;
      }

      return await this.asistenciaModel.find(query).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Esta función lee un QR desde una cadena base64 en un entorno Node.js
  private async leerQrDesdeBase64(base64String: string): Promise<any> {
    try {
      const base64Data = base64String.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Lee la imagen PNG desde el buffer
      const png = PNG.sync.read(buffer);

      // Crea un array de píxeles
      const { data, width, height } = png;
      const pixels = new Uint8ClampedArray(width * height * 4);
      for (let i = 0; i < data.length; i += 4) {
        pixels[i] = data[i];
        pixels[i + 1] = data[i + 1];
        pixels[i + 2] = data[i + 2];
        pixels[i + 3] = data[i + 3];
      }

      // Lee el código QR desde la imagen PNG usando jsQR
      const decoded = jsQR(pixels, width, height, {
        inversionAttempts: 'dontInvert',
      });

      if (decoded) {
        // Parsea y retorna el resultado JSON
        return JSON.parse(decoded.data); // Asegúrate de que los datos sean JSON válidos
      } else {
        throw new Error('No se pudo leer el QR.');
      }
    } catch (error) {
      throw new Error('Error al leer el QR desde base64: ' + error.message);
    }
  }
}
