import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { IsIntFK } from '../../../validators/int-fk.validator';
import { CreateTransacoesExperienciaDto } from './create-transacoes-experiencia.dto';

export class UpdateTransacoesExperienciaDto extends PartialType(CreateTransacoesExperienciaDto) {

    @IsOptional()
    @IsNumber({}, { message: "Inválido." })
    valor: number;
    @IsOptional()
    @IsDateString({}, { message: "Inválida." })
    data: Date;
    @IsOptional()
    @IsIntFK()
    clienteId: number;
    @IsOptional()
    @IsIntFK()
    lojaId: number;
    @IsOptional()
    @IsIntFK()
    colaboradorId: number;

}
