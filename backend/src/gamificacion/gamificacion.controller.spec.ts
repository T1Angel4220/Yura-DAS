import { Test, TestingModule } from '@nestjs/testing';
import { GamificacionController } from './gamificacion.controller';

describe('GamificacionController', () => {
  let controller: GamificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamificacionController],
    }).compile();

    controller = module.get<GamificacionController>(GamificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
