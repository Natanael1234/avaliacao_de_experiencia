import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojasService {

  constructor() { }

  create(createLojaDto: CreateLojaDto) {
    const loja = new Loja();
    loja.nome = createLojaDto.nome;
    return loja.save({ reload: true }).then(entidade => entidade);
  }

  findAll() {
    return Loja.find();
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    let entidade = await Loja.findOne(id);
    if (!entidade) throw new NotFoundException('Loja não encontrada.');
    if (updateLojaDto.nome) entidade.nome = updateLojaDto.nome;
    return entidade.save({ reload: true }).then(entidade => entidade);
  }

  async remove(id: number) {
    let entidade = await Loja.findOneOrFail(id);
    if (!entidade) throw new NotFoundException('Loja não encontrada.');
    return entidade.softRemove({ reload: true }).then(entidade => entidade);
  }

}
