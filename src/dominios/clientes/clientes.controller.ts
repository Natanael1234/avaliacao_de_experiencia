import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query, ParseBoolPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionHandlerFilter } from '../../filters/http-exception-handler.filter';
import { ValidacaoPipe } from '../../validators/validation.pipe';

import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@UseFilters(HttpExceptionHandlerFilter)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  create(@Body(new ValidacaoPipe()) createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidacaoPipe()) updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Query('ativo', ParseBoolPipe) ativo: boolean) {
    return this.clientesService.remove(id);
  }
}
