import { Controller, Get, Post, Body, UseFilters } from '@nestjs/common';
import { HttpExceptionHandlerFilter } from '../../filters/http-exception-handler.filter';
import { ValidacaoPipe } from '../../validators/validation.pipe';
import { AvaliacoesExperienciasService } from './avaliacoes-experiencias.service';
import { CreateAvaliacoesExperienciaDto } from './dto/create-avaliacoes-experiencia.dto';

@UseFilters(HttpExceptionHandlerFilter)
@Controller('avaliacoes-experiencias')
export class AvaliacoesExperienciasController {
  constructor(private readonly avaliacoesExperienciasService: AvaliacoesExperienciasService) { }

  @Post()
  async create(@Body(new ValidacaoPipe()) createAvaliacoesExperienciaDto: CreateAvaliacoesExperienciaDto) {
    return this.avaliacoesExperienciasService.create(createAvaliacoesExperienciaDto);
  }

  @Get()
  async findAll() {
    return this.avaliacoesExperienciasService.findAll();
  }

}
