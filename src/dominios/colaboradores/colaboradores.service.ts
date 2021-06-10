import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto';
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto';
import { Colaborador } from './entities/colaboradore.entity';

@Injectable()
export class ColaboradoresService {

  constructor() { }

  create(createColaboradoreDto: CreateColaboradoreDto) {
    const entity = new Colaborador();
    entity.nome = createColaboradoreDto.nome;
    return entity.save({ reload: true }).then(entity => entity);
  }

  findAll() {
    return Colaborador.find();
  }

  async update(id: number, updateColaboradoreDto: UpdateColaboradoreDto) {
    let colaborador = await Colaborador.findOne(id);
    if (!colaborador) throw new NotFoundException('Colaborador não encontrado.');
    if (colaborador.nome) colaborador.nome = updateColaboradoreDto.nome;
    return await colaborador.save({ reload: true }).then(entity => entity);
  }

  async remove(id: number) {
    let entidade = await Colaborador.findOne(id);
    if (!entidade) throw new NotFoundException('Colaborador não encontrado.');
    return entidade.softRemove({ reload: true }).then(entity => entity);
  }
}
