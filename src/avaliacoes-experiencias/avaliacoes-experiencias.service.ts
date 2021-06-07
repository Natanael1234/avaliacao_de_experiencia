import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAvaliacoesExperienciaDto } from './dto/create-avaliacoes-experiencia.dto';
import { AvaliacoesExperiencia } from './entities/avaliacoes-experiencia.entity';

@Injectable()
export class AvaliacoesExperienciasService {

  constructor(
    @InjectRepository(AvaliacoesExperiencia)
    private avaliacoesExperienciasRepository: Repository<AvaliacoesExperiencia>
  ) { }

  async create(createAvaliacoesExperienciaDto: CreateAvaliacoesExperienciaDto): Promise<any> {
    return this.avaliacoesExperienciasRepository.save(createAvaliacoesExperienciaDto);
  }

  async findAll(): Promise<any[]> {
    return this.avaliacoesExperienciasRepository.find();
  }

}
