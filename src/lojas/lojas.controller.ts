import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseFilters } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { HttpExceptionHandlerFilter } from '../filters/http-exception-handler.filter';
import { ValidacaoPipe } from '../validators/validation.pipe';

@UseFilters(HttpExceptionHandlerFilter)
@Controller('lojas')
export class LojasController {

  constructor(private readonly lojasService: LojasService) { }

  @Post()
  async create(@Body(new ValidacaoPipe()) createLojaDto: CreateLojaDto) {
    return this.lojasService.create(createLojaDto);
  }

  @Get()
  async findAll() {
    return this.lojasService.findAll();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidacaoPipe()) updateLojaDto: UpdateLojaDto) {
    return this.lojasService.update(id, updateLojaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.lojasService.remove(id);
  }

}