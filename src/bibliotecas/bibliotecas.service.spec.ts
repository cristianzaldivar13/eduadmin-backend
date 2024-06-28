import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecasService } from './bibliotecas.service';

describe('BibliotecasService', () => {
  let service: BibliotecasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BibliotecasService],
    }).compile();

    service = module.get<BibliotecasService>(BibliotecasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
