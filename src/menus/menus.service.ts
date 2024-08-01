import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CrearMenuDto } from './dto/crear-menu.dto';
import { ActualizarMenuDto } from './dto/actualizar-menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './models/menu.model';
import { Model, Types } from 'mongoose';
import { PaginacionService } from '../utils/servicios/paginacion.service';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu.name)
    private readonly menuModel: Model<Menu>,
    private readonly paginacionService: PaginacionService,
  ) {}

  async crear(crearMenuDto: CrearMenuDto) {
    const nuevoMenu = new this.menuModel({
      ...crearMenuDto,
    });

    return await nuevoMenu.save();
  }

  async actualizar(
    id: string,
    actualizarMenuDto: ActualizarMenuDto,
  ): Promise<Menu> {
    // Obtiene la calificación actual para preservar usuarioId y escuelaId
    const menu = await this.menuModel.findById(new Types.ObjectId(id)).exec();

    if (!menu) {
      throw new BadRequestException('Menú no encontrado');
    }

    return this.menuModel
      .findOneAndUpdate({ _id: id }, actualizarMenuDto, { new: true })
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
          $unwind: {
            path: '$escuela',
            preserveNullAndEmptyArrays: true, // Manejar casos donde no haya escuela asociada
          },
        },
        {
          $lookup: {
            from: 'menus',
            localField: 'menuId',
            foreignField: '_id',
            as: 'menuPadre',
          },
        },
        {
          $unwind: {
            path: '$menuPadre',
            preserveNullAndEmptyArrays: true, // Manejar casos donde no haya menú padre asociado
          },
        },
        {
          $project: {
            _id: 1,
            nombre: 1,
            subMenu: 1,
            fechaCreacion: 1,
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
            menuId: 1,
            menuPadre: {
              _id: '$menuPadre._id',
              nombre: '$menuPadre.nombre',
              subMenu: '$menuPadre.subMenu',
              fechaCreacion: '$menuPadre.fechaCreacion',
            },
          },
        },
      ];

      const result = await this.menuModel.aggregate(pipeline).exec();

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
      escuelaId: 1,
      nombre: 1,
      subMenu: 1,
      fechaCreacion: 1,
      estatus: 1,
    }; // Proyecta solo ciertos campos

    return this.paginacionService.paginar(
      EnumSecciones.MENUS.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project, // Resultado
    );
  }
}
