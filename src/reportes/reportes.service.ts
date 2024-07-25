import { Injectable } from '@nestjs/common';
import { CrearReporteDto } from './dto/crear-reporte.dto';
import { UpdateReporteDto } from './dto/actualizar-reporte.dto';

@Injectable()
export class ReportesService {
  create(createReporteDto: CrearReporteDto) {
    return 'This action adds a new reporte';
  }

  findAll() {
    return `This action returns all reportes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporte`;
  }

  update(id: number, updateReporteDto: UpdateReporteDto) {
    return `This action updates a #${id} reporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporte`;
  }
}
