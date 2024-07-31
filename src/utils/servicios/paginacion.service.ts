import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { EnumSecciones } from '../enums/secciones.enum';

@Injectable()
export class PaginacionService {
  private readonly mapeoColecciones: Record<string, string> = {
    administracion: 'administraciones',
    asignatura: 'asignaturas',
    calificacion: 'calificaciones',
    grupo: 'grupos',
    asistencia: 'asistencias',
    biblioteca: 'bibliotecas',
    calendario: 'calendario',
    comunicacion: 'comunicaciones',
    curso: 'cursos',
    estudiante: 'estudiantes',
    escuela: 'escuelas',
    evento: 'eventos',
    finanza: 'finanzas',
    notificacion: 'notificaciones',
    profesor: 'profesores',
    reporte: 'reportes',
    rol: 'roles',
    tutor: 'tutores',
    usuario: 'usuarios',
    visitante: 'visitantes',
  };

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

    // Convierte el enum a un array de valores
    const enumSecciones = Object.values(EnumSecciones).map((value) =>
      value.toLowerCase(),
    );

    // Convierte IDs en los filtros y añade el filtro de fechas si es necesario
    const { filtrosConvertidos, lookups } = this.convertirIdsAFiltros(
      filtros,
      enumSecciones,
    );

    const camposBooleanos: any = {};
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key)) {
        if (typeof filtros[key] === 'boolean') {
          camposBooleanos[key] = filtros[key];
        }
      }
    }

    // Identifica los campos de arreglos en los filtros
    const arreglos: any = Object.keys(camposBooleanos).map((key) => key);

    // Construye el pipeline de agregación
    const pipeline: any[] = [
      { $match: filtrosConvertidos },
      ...lookups, // Añade las etapas de lookup para IDs
      ...(Object.keys(sort).length > 0 ? [{ $sort: sort }] : []),
      // Añade dinámicamente los lookups y addFields para los arreglos
      ...arreglos.flatMap((arreglo) => [
        {
          $lookup: {
            from: arreglo,
            localField: arreglo,
            foreignField: '_id',
            as: `${arreglo}Detalles`,
          },
        },
        {
          $addFields: {
            [arreglo]: {
              $cond: {
                if: { $isArray: `$${arreglo}Detalles` },
                then: `$${arreglo}Detalles`,
                else: [],
              },
            },
          },
        },
        {
          $addFields: {
            [arreglo]: {
              $map: {
                input: `$${arreglo}`,
                as: 'detalle',
                in: { _id: '$$detalle._id', nombre: '$$detalle.nombre' },
              },
            },
          },
        },
      ]),
      ...(Object.keys(project).length > 0 ? [{ $project: project }] : []), // Se añade el campo project
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

    console.log(JSON.stringify(pipeline));

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

  private convertirIdsAFiltros(filtros: any, enumSecciones: Array<any>) {
    const filtrosConvertidos: any = {};
    const lookups: any[] = [];

    for (const key in filtros) {
      if (filtros.hasOwnProperty(key)) {
        if (key.endsWith('Id') && Types.ObjectId.isValid(filtros[key])) {
          const coleccion = this.obtenerNombreColeccion(key);
          filtrosConvertidos[key] = new Types.ObjectId(filtros[key]);

          lookups.push({
            $lookup: {
              from: coleccion,
              localField: key,
              foreignField: '_id',
              as: key.replace('Id', ''),
            },
          });

          lookups.push({
            $unwind: {
              path: `$${key.replace('Id', '')}`,
              preserveNullAndEmptyArrays: true,
            },
          });
        } else if (key === 'entreFechas') {
          const { fechaInicial, fechaFinal, campoFecha } = filtros[key];
          if (fechaInicial && fechaFinal && campoFecha) {
            const inicio = new Date(fechaInicial);
            inicio.setUTCHours(0, 0, 0, 0);

            const fin = new Date(fechaFinal);
            fin.setUTCHours(23, 59, 59, 999);

            filtrosConvertidos[campoFecha] = {
              $gte: inicio,
              $lte: fin,
            };
          }
        } else if (enumSecciones.includes(key)) {
          lookups.push({
            $lookup: {
              from: key,
              localField: key,
              foreignField: '_id',
              as: `${key}Detalles`,
            },
          });
        } else {
          filtrosConvertidos[key] = filtros[key];
        }
      }
    }
    return { filtrosConvertidos, lookups };
  }

  private obtenerNombreColeccion(campoId: string): string {
    const nombreColeccion = campoId.replace('Id', '').toLowerCase();
    return this.mapeoColecciones[nombreColeccion] || `${nombreColeccion}s`;
  }
}
