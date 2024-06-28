import { Test, TestingModule } from '@nestjs/testing';
import { AdministracionesController } from './administraciones.controller';
import { AdministracionesService } from './administraciones.service';

describe('AdministracionesController', () => {
  let controller: AdministracionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministracionesController],
      providers: [AdministracionesService],
    }).compile();

    controller = module.get<AdministracionesController>(AdministracionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
