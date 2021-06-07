import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacoesExperienciasService } from './avaliacoes-experiencias.service';

describe('AvaliacoesExperienciasService', () => {
  let service: AvaliacoesExperienciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvaliacoesExperienciasService],
    }).compile();

    service = module.get<AvaliacoesExperienciasService>(AvaliacoesExperienciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
