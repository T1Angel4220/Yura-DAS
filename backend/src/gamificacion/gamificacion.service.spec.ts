import { Test, TestingModule } from '@nestjs/testing';
import { GamificacionService } from './gamificacion.service';

describe('GamificacionService', () => {
  let service: GamificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamificacionService],
    }).compile();

    service = module.get<GamificacionService>(GamificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
