import { Injectable } from '@nestjs/common';
import { CrearTutoresDto } from './dto/create-tutores.dto';

@Injectable()
export class TutoresService {
  create(crearTutoresDto: CrearTutoresDto) {
    return 'This action adds a new familiare';
  }
}
