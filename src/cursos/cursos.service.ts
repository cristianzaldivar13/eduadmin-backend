import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/crear-curso.dto';
import { UpdateCursoDto } from './dto/actualizar-curso.dto';

@Injectable()
export class CursosService {
  create(createCursoDto: CreateCursoDto) {
    return 'This action adds a new curso';
  }

  findAll() {
    return `This action returns all cursos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
