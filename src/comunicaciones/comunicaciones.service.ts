import { Injectable } from '@nestjs/common';
import { CreateComunicacioneDto } from './dto/create-comunicacione.dto';
import { UpdateComunicacioneDto } from './dto/update-comunicacione.dto';

@Injectable()
export class ComunicacionesService {
  create(createComunicacioneDto: CreateComunicacioneDto) {
    return 'This action adds a new comunicacione';
  }

  findAll() {
    return `This action returns all comunicaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comunicacione`;
  }

  update(id: number, updateComunicacioneDto: UpdateComunicacioneDto) {
    return `This action updates a #${id} comunicacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} comunicacione`;
  }
}
