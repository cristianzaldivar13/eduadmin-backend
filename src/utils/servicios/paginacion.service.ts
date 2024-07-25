import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

@Injectable()
export class PaginacionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async paginar(
    collectionName: string,
    filtros: any = {},
    limit: number = 10,
    skip: number = 0,
    sort: Record<string, 1 | -1> = {},
    project: any = {}, // Agrega el campo project
  ): Promise<any> {
    // Validaciones
    if (limit < 0) {
      throw new BadRequestException('El límite debe ser un número positivo.');
    }
    if (skip < 0) {
      throw new BadRequestException('El skip debe ser un número positivo.');
    }

    // Convierte IDs en los filtros y añade el filtro de fechas si es necesario
    filtros = this.convertirIdsAFiltros(filtros);

    // Construir el pipeline de agregación
    const pipeline: any[] = [
      { $match: filtros },
      ...(Object.keys(sort).length > 0 ? [{ $sort: sort }] : []),
      ...(Object.keys(project).length > 0 ? [{ $project: project }] : []), // Agrega el paso $project si se proporciona
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
    ];

    // Obtiene la colección y ejecuta la agregación
    try {
      const collection = this.connection.collection(collectionName);
      const result = await collection.aggregate(pipeline).toArray();

      return (
        result[0] || {
          total: 0,
          pagina: 1,
          tamanoPagina: 0,
          resultados: [],
        }
      );
    } catch (error) {
      throw new BadRequestException(
        'Error al ejecutar la consulta de paginación.',
      );
    }
  }

  private convertirIdsAFiltros(filtros: any) {
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key)) {
        // Verifica si la clave termina en 'Id' y si el valor es un ID válido
        if (key.endsWith('Id') && Types.ObjectId.isValid(filtros[key])) {
          filtros[key] = new Types.ObjectId(filtros[key]);
        }
        // Verifica si hay un filtro de fechas
        if (key === 'entreFechas') {
          const { fechaInicial, fechaFinal, campoFecha } = filtros[key];
          if (fechaInicial && fechaFinal && campoFecha) {
            const inicio = new Date(fechaInicial);
            inicio.setUTCHours(0, 0, 0, 0); // Ajusta la fecha de inicio a las 00:00:00

            const fin = new Date(fechaFinal);
            fin.setUTCHours(23, 59, 59, 999); // Ajusta la fecha de fin a las 23:59:59

            filtros[campoFecha] = {
              $gte: inicio,
              $lte: fin,
            };
          }
          delete filtros[key]; // Elimina el filtro entreFechas para evitar conflictos en $match
        }
      }
    }
    return filtros;
  }
}
