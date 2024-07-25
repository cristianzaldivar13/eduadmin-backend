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
    if (await this.validaExistencia(crearMenuDto)) {
      throw new ConflictException(
        'Ya ha sido registrada anteriormente este menú',
      );
    }

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

  private async validaExistencia(crearMenuDto: CrearMenuDto) {
    // Validar que el ID de la escuela es válido
    if (!Types.ObjectId.isValid(crearMenuDto.escuelaId)) {
      throw new BadRequestException('El Id de la escuela no es válido');
    }

    // Validar que si subMenu es true, se debe proporcionar menuId
    if (crearMenuDto.subMenu) {
      if (!crearMenuDto.menuId) {
        throw new BadRequestException(
          'Se requiere menuId cuando subMenu es verdadero',
        );
      }
      // Asegúrate de que menuId sea un ObjectId válido
      if (!Types.ObjectId.isValid(crearMenuDto.menuId)) {
        throw new BadRequestException('El Id del menú no es válido');
      }
      crearMenuDto.menuId = new Types.ObjectId(crearMenuDto.menuId);
    } else {
      // Si subMenu es false y menuId es proporcionado, arroja error
      if (crearMenuDto.menuId) {
        throw new BadRequestException(
          'No se debe proporcionar menuId cuando subMenu es falso',
        );
      }
    }

    // Construir la consulta
    const query: any = {
      escuelaId: new Types.ObjectId(crearMenuDto.escuelaId),
      nombre: crearMenuDto.nombre,
    };

    // Agregar menuId a la consulta si subMenu es true
    if (crearMenuDto.subMenu) {
      query.menuId = crearMenuDto.menuId;
    }

    // Ejecutar la consulta
    return await this.menuModel.findOne(query).exec();
  }
}
