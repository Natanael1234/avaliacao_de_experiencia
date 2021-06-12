import { Module } from '@nestjs/common';
import { AvaliacoesExperienciasService } from './avaliacoes-experiencias.service';
import { AvaliacoesExperienciasController } from './avaliacoes-experiencias.controller';
import { AvaliacoesExperiencia } from './entities/avaliacoes-experiencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AvaliacoesExperiencia])],
  exports: [TypeOrmModule],
  controllers: [AvaliacoesExperienciasController],
  providers: [AvaliacoesExperienciasService]
})
export class AvaliacoesExperienciasModule { }
