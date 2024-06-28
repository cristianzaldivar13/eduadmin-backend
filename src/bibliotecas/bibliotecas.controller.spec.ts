import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecasController } from './bibliotecas.controller';
import { BibliotecasService } from './bibliotecas.service';

describe('BibliotecasController', () => {
  let controller: BibliotecasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliotecasController],
      providers: [BibliotecasService],
    }).compile();

    controller = module.get<BibliotecasController>(BibliotecasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
