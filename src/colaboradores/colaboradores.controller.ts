import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionHandlerFilter } from '../filters/http-exception-handler.filter';
import { ValidacaoPipe } from '../validators/validation.pipe';
import { ColaboradoresService } from './colaboradores.service';
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto';
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto';

@UseFilters(HttpExceptionHandlerFilter)
@Controller('colaboradores')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) { }

  @Post()
  async create(@Body(new ValidacaoPipe()) createColaboradoreDto: CreateColaboradoreDto) {
    return this.colaboradoresService.create(createColaboradoreDto);
  }

  @Get()
  async findAll() {
    return this.colaboradoresService.findAll();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidacaoPipe()) updateColaboradoreDto: UpdateColaboradoreDto) {
    return this.colaboradoresService.update(id, updateColaboradoreDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.colaboradoresService.remove(id);
  }
}
