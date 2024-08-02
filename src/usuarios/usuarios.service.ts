import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './models/usuario.model';
import * as QRCode from 'qrcode';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { EnumSecciones } from '../utils/enums/secciones.enum';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { PaginacionService } from '../utils/servicios/paginacion.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
    private readonly paginacionService: PaginacionService,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    // Verifica si el correo ya existe
    const existeUsuario = await this.usuarioModel.findOne({
      correo: crearUsuarioDto.correo,
    });
    if (existeUsuario) {
      throw new BadRequestException('El correo ya está registrado.');
    }

    // Convierte escuelaId a ObjectId
    const escuelaId = new Types.ObjectId(crearUsuarioDto.escuelaId);

    // Crear nuevo usuario
    const nuevoUsuario = new this.usuarioModel({
      ...crearUsuarioDto,
      escuelaId,
    });

    // Generar QR
    if (
      crearUsuarioDto.rol.includes(EnumRolesUsuario.ESTUDIANTE) ||
      crearUsuarioDto.rol.includes(EnumRolesUsuario.PROFESOR)
    ) {
      const qrData = JSON.stringify({
        usuarioId: nuevoUsuario._id.toString(),
        escuelaId: nuevoUsuario.escuelaId.toString(),
      });

      const qrCode = await QRCode.toDataURL(qrData);
      nuevoUsuario.qrCode = qrCode;
    }

    return await nuevoUsuario.save();
  }

  async actualizar(id: string, actualizarUsuarioDto: ActualizarUsuarioDto) {
    return await this.usuarioModel.findOneAndUpdate(
      new Types.ObjectId(id),
      actualizarUsuarioDto,
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
          $lookup: {
            from: 'grupos',
            let: {
              grupoIds: {
                $cond: {
                  if: { $isArray: '$grupos' },
                  then: '$grupos',
                  else: ['$grupoId'],
                },
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$grupoIds'],
                  },
                },
              },
            ],
            as: 'gruposDetalles',
          },
        },
        {
          $lookup: {
            from: 'menus',
            let: {
              menuIds: '$menus',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$menuIds'],
                  },
                },
              },
            ],
            as: 'menusDetalles',
          },
        },
        {
          $lookup: {
            from: 'menus',
            let: {
              parentMenuIds: {
                $map: {
                  input: '$menusDetalles',
                  as: 'menu',
                  in: {
                    $cond: {
                      if: { $eq: ['$$menu.subMenu', false] },
                      then: '$$menu._id',
                      else: null,
                    },
                  },
                },
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$menuId', '$$parentMenuIds'],
                  },
                },
              },
            ],
            as: 'subMenusDetalles',
          },
        },
        {
          $project: {
            _id: 1,
            nombre: 1,
            apellidoPaterno: 1,
            apellidoMaterno: 1,
            fechaNacimiento: 1,
            sexo: 1,
            telefono: 1,
            niveles: 1,
            correo: 1,
            matricula: 1,
            rol: 1,
            estatus: 1,
            fechaCreacion: 1,
            qrCode: 1,
            fechaEdicion: 1,
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
            grupos: {
              $map: {
                input: '$gruposDetalles',
                as: 'grupo',
                in: {
                  _id: '$$grupo._id',
                  nombre: '$$grupo.nombre',
                  descripcion: '$$grupo.descripcion',
                  estatus: '$$grupo.estatus',
                  nivel: '$$grupo.nivel',
                },
              },
            },
            menus: {
              $map: {
                input: '$menusDetalles',
                as: 'menu',
                in: {
                  _id: '$$menu._id',
                  nombre: '$$menu.nombre',
                  menuId: '$$menu.menuId',
                  subMenu: '$$menu.subMenu',
                  subMenus: {
                    $filter: {
                      input: '$subMenusDetalles',
                      as: 'subMenu',
                      cond: { $eq: ['$$subMenu.menuId', '$$menu._id'] },
                    },
                  },
                },
              },
            },
          },
        },
      ];

      return await this.usuarioModel.aggregate(pipeline).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return await this.usuarioModel.findOne({ correo }).exec();
  }

  async buscarTodo(): Promise<Usuario[] | null> {
    return await this.usuarioModel.find().exec();
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    try {
      return await this.usuarioModel
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
      nombre: 1,
      apellidoPaterno: 1,
      apellidoMaterno: 1,
      fechaNacimiento: 1,
      sexo: 1,
      telefono: 1,
      niveles: 1,
      correo: 1,
      rol: 1,
      estatus: 1,
      fechaCreacion: 1,
      grupos: 1,
      menus: 1,
    }; // Proyecta solo ciertos campos

    return this.paginacionService.paginar(
      EnumSecciones.USUARIOS.toLowerCase(), // Nombre de la colección
      filtros, // Filtros
      limit, // Límite
      skip, // Salto
      sort, // Ordenación
      project, // Resultado
    );
  }
}
