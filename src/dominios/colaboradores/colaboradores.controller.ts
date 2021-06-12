import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionHandlerFilter } from '../../filters/http-exception-handler.filter';
import { ValidacaoPipe } from '../../validators/validation.pipe';
import { ColaboradoresService } from './colaboradores.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@UseFilters(HttpExceptionHandlerFilter)
@Controller('colaboradores')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) { }

  @Post()
  async create(@Body(new ValidacaoPipe()) createColaboradoreDto: CreateColaboradorDto) {
    return this.colaboradoresService.create(createColaboradoreDto);
  }

  @Get()
  async findAll() {
    return this.colaboradoresService.findAll();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidacaoPipe()) updateColaboradoreDto: UpdateColaboradorDto) {
    return this.colaboradoresService.update(id, updateColaboradoreDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.colaboradoresService.remove(id);
  }
}
