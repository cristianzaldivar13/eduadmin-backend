import { Injectable } from '@nestjs/common';
import { CrearVisitanteDto } from './dto/crear-visitante.dto';
import { UpdateVisitanteDto } from './dto/actualizar-visitante.dto';

@Injectable()
export class VisitantesService {
  create(createVisitanteDto: CrearVisitanteDto) {
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
