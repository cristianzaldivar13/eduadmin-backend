import { Injectable } from '@nestjs/common';
import { CreateCursosAsignaturaDto } from './dto/create-cursos-asignatura.dto';
import { UpdateCursosAsignaturaDto } from './dto/update-cursos-asignatura.dto';

@Injectable()
export class CursosAsignaturasService {
  create(createCursosAsignaturaDto: CreateCursosAsignaturaDto) {
    return 'This action adds a new cursosAsignatura';
  }

  findAll() {
    return `This action returns all cursosAsignaturas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursosAsignatura`;
  }

  update(id: number, updateCursosAsignaturaDto: UpdateCursosAsignaturaDto) {
    return `This action updates a #${id} cursosAsignatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursosAsignatura`;
  }
}
