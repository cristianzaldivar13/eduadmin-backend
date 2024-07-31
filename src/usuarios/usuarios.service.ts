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

  async actualizar(
    id: string,
    actualizarUsuarioDto: ActualizarUsuarioDto,
  ) {
    return await this.usuarioModel.findOneAndUpdate(
      new Types.ObjectId(id),
      actualizarUsuarioDto,
    );
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
      fechaCreacion: 1,
      grupos: 1,
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
