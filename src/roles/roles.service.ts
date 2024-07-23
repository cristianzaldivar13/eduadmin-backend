import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrearRolDto } from './dto/create-role.dto';
import { Roles, RolesDocument } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name) private rolModel: Model<RolesDocument>
  ) {}

  async crear(crearRolDto: CrearRolDto): Promise<Roles> {
    const creadoRol = new this.rolModel(crearRolDto);
    return creadoRol.save();
  }

  async encontrarPorNombre(nombre: string): Promise<Roles> {
    return this.rolModel.findOne({ nombre }).exec();
  }

  async buscarTodo(): Promise<Roles[]> {
    return this.rolModel.find().exec();
  }
}
 