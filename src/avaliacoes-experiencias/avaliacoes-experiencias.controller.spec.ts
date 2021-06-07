import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacoesExperienciasController } from './avaliacoes-experiencias.controller';
import { AvaliacoesExperienciasService } from './avaliacoes-experiencias.service';

describe('AvaliacoesExperienciasController', () => {
  let controller: AvaliacoesExperienciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacoesExperienciasController],
      providers: [AvaliacoesExperienciasService],
    }).compile();

    controller = module.get<AvaliacoesExperienciasController>(AvaliacoesExperienciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
