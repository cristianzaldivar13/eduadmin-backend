import { Test, TestingModule } from '@nestjs/testing';
import { CursosAsignaturasController } from './cursos-asignaturas.controller';
import { CursosAsignaturasService } from './cursos-asignaturas.service';

describe('CursosAsignaturasController', () => {
  let controller: CursosAsignaturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursosAsignaturasController],
      providers: [CursosAsignaturasService],
    }).compile();

    controller = module.get<CursosAsignaturasController>(CursosAsignaturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
