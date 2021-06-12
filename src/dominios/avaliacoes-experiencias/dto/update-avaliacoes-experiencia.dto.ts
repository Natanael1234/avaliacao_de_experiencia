import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacoesExperienciaDto } from './create-avaliacoes-experiencia.dto';

export class UpdateAvaliacoesExperienciaDto extends PartialType(CreateAvaliacoesExperienciaDto) {
    nota: number;
    comentario: string;
    transacaoExperienciaId: number;
}
