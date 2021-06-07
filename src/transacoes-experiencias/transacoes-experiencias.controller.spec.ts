import { Test, TestingModule } from '@nestjs/testing';
import { TransacoesExperienciasController } from './transacoes-experiencias.controller';
import { TransacoesExperienciasService } from './transacoes-experiencias.service';

describe('TransacoesExperienciasController', () => {
  let controller: TransacoesExperienciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesExperienciasController],
      providers: [TransacoesExperienciasService],
    }).compile();

    controller = module.get<TransacoesExperienciasController>(TransacoesExperienciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
