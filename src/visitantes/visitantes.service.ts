import { Injectable } from '@nestjs/common';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';

@Injectable()
export class VisitantesService {
  create(createVisitanteDto: CreateVisitanteDto) {
    return 'This action adds a new visitante';
  }

  findAll() {
    return `This action returns all visitantes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitante`;
  }

  update(id: number, updateVisitanteDto: UpdateVisitanteDto) {
    return `This action updates a #${id} visitante`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitante`;
  }
}
