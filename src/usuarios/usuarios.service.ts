import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './models/usuario.model';
import * as QRCode from 'qrcode';
import { EnumRolesUsuario } from '../utils/enums/roles-usuario.enum';
import { ActualizarUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async crearUsuario(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    // Verifica si el correo ya existe
    const existeUsuario = await this.usuarioModel.findOne({
      correo: crearUsuarioDto.correo,
    });
    if (existeUsuario) {
      throw new BadRequestException('El correo ya está registrado.');
    }

    // Crear nuevo usuario
    const nuevoUsuario = new this.usuarioModel({
      ...crearUsuarioDto,
    });

    // Generar QR
    if (crearUsuarioDto.rol.includes(EnumRolesUsuario.ESTUDIANTE)) {
      const qrCode = await QRCode.toDataURL(`${nuevoUsuario._id}`);
      nuevoUsuario.qrCode = qrCode;
    }

    return await nuevoUsuario.save();
  }

  async actualizarUsuario(id: string, actualizarUsuarioDto: ActualizarUsuarioDto){
    return await this.usuarioModel.findOneAndUpdate(new Types.ObjectId(id), actualizarUsuarioDto);
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
}
