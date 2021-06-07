import { Test, TestingModule } from '@nestjs/testing';
import { TransacoesExperienciasService } from './transacoes-experiencias.service';

describe('TransacoesExperienciasService', () => {
  let service: TransacoesExperienciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransacoesExperienciasService],
    }).compile();

    service = module.get<TransacoesExperienciasService>(TransacoesExperienciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
