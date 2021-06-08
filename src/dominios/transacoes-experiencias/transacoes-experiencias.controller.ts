import { Controller, Post, Body, Param, ParseIntPipe, Put, UseFilters } from '@nestjs/common';
import { TransacoesExperienciasService } from './transacoes-experiencias.service';
import { CreateTransacoesExperienciaDto } from './dto/create-transacoes-experiencia.dto';
import { UpdateTransacoesExperienciaDto } from './dto/update-transacoes-experiencia.dto';
import { ValidacaoPipe } from '../../validators/validation.pipe';
import { HttpExceptionHandlerFilter } from '../../filters/http-exception-handler.filter';

@UseFilters(HttpExceptionHandlerFilter)
@Controller('transacoes-experiencias')
export class TransacoesExperienciasController {
  constructor(private readonly transacoesExperienciasService: TransacoesExperienciasService) { }

  @Post()
  async create(@Body(new ValidacaoPipe()) createTransacoesExperienciaDto: CreateTransacoesExperienciaDto) {
    return this.transacoesExperienciasService.create(createTransacoesExperienciaDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidacaoPipe()) updateTransacoesExperienciaDto: UpdateTransacoesExperienciaDto) {
    return this.transacoesExperienciasService.update(id, updateTransacoesExperienciaDto);
  }

}
