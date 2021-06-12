import { Module } from '@nestjs/common';
import { TransacoesExperienciasService } from './transacoes-experiencias.service';
import { TransacoesExperienciasController } from './transacoes-experiencias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacoesExperiencia } from './entities/transacoes-experiencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransacoesExperiencia])],
  exports: [TypeOrmModule],
  controllers: [TransacoesExperienciasController],
  providers: [TransacoesExperienciasService]
})
export class TransacoesExperienciasModule {}
