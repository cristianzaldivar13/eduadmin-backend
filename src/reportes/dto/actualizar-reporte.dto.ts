import { PartialType } from '@nestjs/mapped-types';
import { CrearReporteDto } from './crear-reporte.dto';

export class UpdateReporteDto extends PartialType(CrearReporteDto) {
  id: number;
}
