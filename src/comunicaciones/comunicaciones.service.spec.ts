import { Test, TestingModule } from '@nestjs/testing';
import { ComunicacionesService } from './comunicaciones.service';

describe('ComunicacionesService', () => {
  let service: ComunicacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComunicacionesService],
    }).compile();

    service = module.get<ComunicacionesService>(ComunicacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
