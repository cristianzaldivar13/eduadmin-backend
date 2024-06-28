import { Test, TestingModule } from '@nestjs/testing';
import { ComunicacionesController } from './comunicaciones.controller';
import { ComunicacionesService } from './comunicaciones.service';

describe('ComunicacionesController', () => {
  let controller: ComunicacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunicacionesController],
      providers: [ComunicacionesService],
    }).compile();

    controller = module.get<ComunicacionesController>(ComunicacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
