import { Injectable, NotFoundException } from '@nestjs/common';
import { curDateWithoutTimezone } from '../../utils/date.utils';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojasService {

  constructor() { }

  create(createLojaDto: CreateLojaDto) {
    const loja = new Loja();
    loja.nome = createLojaDto.nome;
    return loja.save({ reload: true });
  }

  findAll() {
    return Loja.find();
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    let loja = await Loja.findOne(id);
    if (!loja) throw new NotFoundException('Loja não encontrada.');
    if (updateLojaDto.nome) loja.nome = updateLojaDto.nome;
    return loja.save({ reload: true });
  }

  async remove(id: number) {
    let loja = await Loja.findOneOrFail(id);
    if (!loja) throw new NotFoundException('Loja não encontrada.');
    loja.deletedAt = curDateWithoutTimezone();
    return loja.save({ reload: true });
  }

}
