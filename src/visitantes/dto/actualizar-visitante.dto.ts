import { PartialType } from '@nestjs/mapped-types';
import { CrearVisitanteDto } from './crear-visitante.dto';

export class UpdateVisitanteDto extends PartialType(CrearVisitanteDto) {}
