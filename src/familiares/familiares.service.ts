import { Injectable } from '@nestjs/common';
import { CreateFamiliareDto } from './dto/create-familiare.dto';
import { UpdateFamiliareDto } from './dto/update-familiare.dto';

@Injectable()
export class FamiliaresService {
  create(createFamiliareDto: CreateFamiliareDto) {
    return 'This action adds a new familiare';
  }

  findAll() {
    return `This action returns all familiares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familiare`;
  }

  update(id: number, updateFamiliareDto: UpdateFamiliareDto) {
    return `This action updates a #${id} familiare`;
  }

  remove(id: number) {
    return `This action removes a #${id} familiare`;
  }
}
