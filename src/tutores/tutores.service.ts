import { Injectable } from '@nestjs/common';
import { CrearTutoresDto } from './dto/crear-tutores.dto';

@Injectable()
export class TutoresService {
  create(crearTutoresDto: CrearTutoresDto) {
    return 'This action adds a new familiare';
  }
}
