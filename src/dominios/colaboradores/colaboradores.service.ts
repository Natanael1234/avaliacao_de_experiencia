import { Injectable, NotFoundException } from '@nestjs/common';
import { curDateWithoutTimezone } from '../../utils/date.utils';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { Colaborador } from './entities/colaborador.entity';

@Injectable()
export class ColaboradoresService {

  constructor() { }

  create(createColaboradoreDto: CreateColaboradorDto) {
    const colaborador = new Colaborador();
    colaborador.nome = createColaboradoreDto.nome;
    return colaborador.save({ reload: true });
  }

  findAll() {
    return Colaborador.find();
  }

  async update(id: number, updateColaboradoreDto: UpdateColaboradorDto) {
    let colaborador = await Colaborador.findOne(id);
    if (!colaborador) throw new NotFoundException('Colaborador não encontrado.');
    if (colaborador.nome) colaborador.nome = updateColaboradoreDto.nome;
    return colaborador.save({ reload: true });
  }

  async remove(id: number) {
    let colaborador = await Colaborador.findOne(id);
    if (!colaborador) throw new NotFoundException('Colaborador não encontrado.');
    colaborador.deletedAt = curDateWithoutTimezone();
    return colaborador.save({ reload: true });
  }
}
