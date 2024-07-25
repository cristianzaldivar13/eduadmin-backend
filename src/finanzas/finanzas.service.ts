import { Injectable } from '@nestjs/common';
import { CreateFinanzaDto } from './dto/crear-finanza.dto';
import { UpdateFinanzaDto } from './dto/actualizar-finanza.dto';

@Injectable()
export class FinanzasService {
  create(createFinanzaDto: CreateFinanzaDto) {
    return 'This action adds a new finanza';
  }

  findAll() {
    return `This action returns all finanzas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finanza`;
  }

  update(id: number, updateFinanzaDto: UpdateFinanzaDto) {
    return `This action updates a #${id} finanza`;
  }

  remove(id: number) {
    return `This action removes a #${id} finanza`;
  }
}
