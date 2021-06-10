import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransacoesExperienciaDto } from './dto/create-transacoes-experiencia.dto';
import { UpdateTransacoesExperienciaDto } from './dto/update-transacoes-experiencia.dto';
import { TransacoesExperiencia } from './entities/transacoes-experiencia.entity';

@Injectable()
export class TransacoesExperienciasService {

  constructor() { }

  create(createTransacoesExperienciaDto: CreateTransacoesExperienciaDto) {
    const transacaoExperiencia = new TransacoesExperiencia();
    transacaoExperiencia.valor = createTransacoesExperienciaDto.valor;
    transacaoExperiencia.clienteId = createTransacoesExperienciaDto.clienteId;
    transacaoExperiencia.colaboradorId = createTransacoesExperienciaDto.colaboradorId;
    transacaoExperiencia.lojaId = createTransacoesExperienciaDto.lojaId;
    transacaoExperiencia.data = createTransacoesExperienciaDto.data;
    return TransacoesExperiencia.save(transacaoExperiencia, { reload: true }).then(entidade => entidade);
  }

  async update(id: number, updateTransacoesExperienciaDto: UpdateTransacoesExperienciaDto) {
    let entidade = await TransacoesExperiencia.findOne(id);
    if (!entidade) throw new NotFoundException('Transação/Experiência não encontrada.');
    entidade.valor = updateTransacoesExperienciaDto.valor;
    entidade.data = updateTransacoesExperienciaDto.data;
    entidade.clienteId = updateTransacoesExperienciaDto.clienteId;
    entidade.lojaId = updateTransacoesExperienciaDto.lojaId;
    entidade.colaboradorId = updateTransacoesExperienciaDto.colaboradorId;
    return entidade.save({ reload: true }).then(entidade => entidade);
  }

}
