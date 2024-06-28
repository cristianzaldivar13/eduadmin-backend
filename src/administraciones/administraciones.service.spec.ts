import { Test, TestingModule } from '@nestjs/testing';
import { AdministracionesService } from './administraciones.service';

describe('AdministracionesService', () => {
  let service: AdministracionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministracionesService],
    }).compile();

    service = module.get<AdministracionesService>(AdministracionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
