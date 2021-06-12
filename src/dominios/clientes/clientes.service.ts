import { Injectable, NotFoundException } from '@nestjs/common';
import { curDateWithoutTimezone } from '../../utils/date.utils';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor() { }

  create(createClienteDto: CreateClienteDto) {
    const cliente = new Cliente();
    cliente.nome = createClienteDto.nome;
    cliente.cpf = createClienteDto.cpf;
    cliente.email = createClienteDto.email;
    cliente.telefone = createClienteDto.telefone;
    return cliente.save({ reload: true });
  }

  findAll() {
    return Cliente.find();
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    let cliente = await Cliente.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    if (cliente.nome) cliente.nome = updateClienteDto.nome;
    if (cliente.email) cliente.email = updateClienteDto.email;
    if (cliente.telefone) cliente.telefone = updateClienteDto.telefone;
    if (cliente.cpf) cliente.cpf = updateClienteDto.cpf;
    return cliente.save({ reload: true });
  }

  async remove(id: number) {
    let cliente = await Cliente.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    cliente.deletedAt = curDateWithoutTimezone();
    return cliente.save({ reload: true });
  }
}
