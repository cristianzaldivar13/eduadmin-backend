import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './models/usuario.model';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
  ) {}

  async crearUsuario(usuario: CrearUsuarioDto): Promise<Usuario> {
    const { contrasena, ...rest } = usuario;
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar la contraseña
    const nuevoUsuario = new this.usuarioModel({
      ...rest,
      contrasena: hashedPassword,
    });
    return await nuevoUsuario.save();
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return await this.usuarioModel.findOne({ correo }).exec();
  }

  async buscarTodo(): Promise<Usuario | null> {
    return await this.usuarioModel.findOne().exec();
  }
}
