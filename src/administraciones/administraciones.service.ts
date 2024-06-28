import { Injectable } from '@nestjs/common';
import { CreateAdministracioneDto } from './dto/create-administracione.dto';
import { UpdateAdministracioneDto } from './dto/update-administracione.dto';

@Injectable()
export class AdministracionesService {
  create(createAdministracioneDto: CreateAdministracioneDto) {
    return 'This action adds a new administracione';
  }

  findAll() {
    return `This action returns all administraciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administracione`;
  }

  update(id: number, updateAdministracioneDto: UpdateAdministracioneDto) {
    return `This action updates a #${id} administracione`;
  }

  remove(id: number) {
    return `This action removes a #${id} administracione`;
  }
}
