import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojasService {

  constructor(
    @InjectRepository(Loja)
    private lojasRepository: Repository<Loja>
  ) {

  }

  async create(loja: CreateLojaDto) {
    return this.lojasRepository.save(loja);
  }

  async findAll() {
    return this.lojasRepository.find();
  }

  async update(id: number, loja: UpdateLojaDto) {
    let entidade = await this.lojasRepository.findOne(id);
    if (!entidade) throw new NotFoundException('Loja não encontrada.');
    if (loja.nome) entidade.nome = loja.nome;
    return await entidade.save({ reload: true });
  }

  async remove(id: number) {
    let entidade = await this.lojasRepository.findOne(id);
    if (!entidade) throw new NotFoundException('Loja não encontrada.');
    return await entidade.softRemove({ reload: true });
  }

}
