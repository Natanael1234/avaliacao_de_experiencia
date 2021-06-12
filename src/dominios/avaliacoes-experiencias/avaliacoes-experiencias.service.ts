import { Injectable } from '@nestjs/common';
import { CreateAvaliacoesExperienciaDto } from './dto/create-avaliacoes-experiencia.dto';
import { AvaliacoesExperiencia } from './entities/avaliacoes-experiencia.entity';

@Injectable()
export class AvaliacoesExperienciasService {

  constructor() { }

  create(createAvaliacoesExperienciaDto: CreateAvaliacoesExperienciaDto): Promise<any> {
    const avaliacaoExperiencia = new AvaliacoesExperiencia();
    avaliacaoExperiencia.nota = createAvaliacoesExperienciaDto.nota;
    avaliacaoExperiencia.comentario = createAvaliacoesExperienciaDto.comentario;
    avaliacaoExperiencia.transacaoExperienciaId = createAvaliacoesExperienciaDto.transacaoExperienciaId;
    return avaliacaoExperiencia.save({ reload: true });
  }

  findAll(): Promise<any[]> {
    return AvaliacoesExperiencia.find();
  }

}
