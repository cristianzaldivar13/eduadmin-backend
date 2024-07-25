import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class PaginacionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async paginate(
    collectionName: string,
    filters: any = {},
    limit: number = 10,
    skip: number = 0,
    sort: Record<string, 1 | -1> = {},
  ): Promise<any> {
    // Validaciones
    if (limit < 0) {
      throw new BadRequestException('El límite debe ser un número positivo.');
    }
    if (skip < 0) {
      throw new BadRequestException('El skip debe ser un número positivo.');
    }

    // Construir el pipeline de agregación
    const pipeline: any[] = [
      { $match: filters },
      ...(Object.keys(sort).length > 0 ? [{ $sort: sort }] : []),
      { $facet: {
        resultados: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: 'total' }],
      }},
      { $addFields: {
        total: { $arrayElemAt: ['$total.total', 0] },
        pagina: { $literal: Math.floor(skip / limit) + 1 },
        tamanoPagina: { $size: '$resultados' },
      }},
    ];

    // Obtener la colección y ejecutar la agregación
    try {
      const collection = this.connection.collection(collectionName);
      const result = await collection.aggregate(pipeline).toArray();

      return result[0] || {
        total: 0,
        pagina: 1,
        tamanoPagina: 0,
        resultados: [],
      };
    } catch (error) {
      throw new BadRequestException('Error al ejecutar la consulta de paginación.');
    }
  }
}
