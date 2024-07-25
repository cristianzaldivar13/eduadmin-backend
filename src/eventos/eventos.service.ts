import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/crear-evento.dto';
import { UpdateEventoDto } from './dto/actualizar-evento.dto';

@Injectable()
export class EventosService {
  create(createEventoDto: CreateEventoDto) {
    return 'This action adds a new evento';
  }

  findAll() {
    return `This action returns all eventos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return `This action updates a #${id} evento`;
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
