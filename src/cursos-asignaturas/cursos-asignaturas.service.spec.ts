import { Test, TestingModule } from '@nestjs/testing';
import { CursosAsignaturasService } from './cursos-asignaturas.service';

describe('CursosAsignaturasService', () => {
  let service: CursosAsignaturasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursosAsignaturasService],
    }).compile();

    service = module.get<CursosAsignaturasService>(CursosAsignaturasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
