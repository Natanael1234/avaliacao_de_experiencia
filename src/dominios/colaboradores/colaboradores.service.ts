import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto';
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto';
import { Colaborador } from './entities/colaboradore.entity';

@Injectable()
export class ColaboradoresService {

  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>
  ) { }

  async create(createColaboradoreDto: CreateColaboradoreDto) {
    return this.colaboradorRepository.save(createColaboradoreDto, { reload: true });
  }

  async findAll() {
    return this.colaboradorRepository.find();
  }

  async update(id: number, updateColaboradoreDto: UpdateColaboradoreDto) {
    let colaborador = await this.colaboradorRepository.findOne(id);
    if (!colaborador) throw new NotFoundException('Colaborador não encontrado.');
    if (colaborador.nome) colaborador.nome = updateColaboradoreDto.nome;
    return await colaborador.save({ reload: true });
  }

  async remove(id: number) {
    let entidade = await this.colaboradorRepository.findOne(id);
    if (!entidade) throw new NotFoundException('Colaborador não encontrado.');
    return await entidade.softRemove({ reload: true });
  }
}
