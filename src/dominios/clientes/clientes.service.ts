import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from '../lojas/entities/loja.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>
  ) { }

  async create(createClienteDto: CreateClienteDto) {
    return this.clientesRepository.save(createClienteDto);
  }

  async findAll() {
    return this.clientesRepository.find();
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    let cliente = await this.clientesRepository.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    if (cliente.nome) cliente.nome = updateClienteDto.nome;
    if (cliente.email) cliente.email = updateClienteDto.email;
    if (cliente.telefone) cliente.telefone = updateClienteDto.telefone;
    if (cliente.cpf) cliente.cpf = updateClienteDto.cpf;
    return await cliente.save({ reload: true }).then(entidade => entidade);
  }

  async remove(id: number) {
    let entidade = await this.clientesRepository.findOne(id);
    if (!entidade) throw new NotFoundException('Loja não encontrado.');
    return await entidade.softRemove({ reload: true });
  }
}
