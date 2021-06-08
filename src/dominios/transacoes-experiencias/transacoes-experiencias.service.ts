import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransacoesExperienciaDto } from './dto/create-transacoes-experiencia.dto';
import { UpdateTransacoesExperienciaDto } from './dto/update-transacoes-experiencia.dto';
import { TransacoesExperiencia } from './entities/transacoes-experiencia.entity';

@Injectable()
export class TransacoesExperienciasService {

  constructor(
    @InjectRepository(TransacoesExperiencia)
    private transacoesExperienciasRepository: Repository<TransacoesExperiencia>
  ) { }

  async create(createTransacoesExperienciaDto: CreateTransacoesExperienciaDto) {    
    return this.transacoesExperienciasRepository.save(createTransacoesExperienciaDto);
  }

  async update(id: number, updateTransacoesExperienciaDto: UpdateTransacoesExperienciaDto) {
    let entidade = await this.transacoesExperienciasRepository.findOne(id);
    if (!entidade) throw new NotFoundException('Transação/Experiência não encontrada.');
    entidade.valor = updateTransacoesExperienciaDto.valor;
    entidade.data = updateTransacoesExperienciaDto.data;
    entidade.clienteId = updateTransacoesExperienciaDto.clienteId;
    entidade.lojaId = updateTransacoesExperienciaDto.lojaId;
    entidade.colaboradorId = updateTransacoesExperienciaDto.colaboradorId;
    return await entidade.save({ reload: true }).then(entidade => entidade);
  }

}
