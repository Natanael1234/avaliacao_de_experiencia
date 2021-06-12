import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateColaboradorDto } from './create-colaborador.dto';

export class UpdateColaboradorDto extends PartialType(CreateColaboradorDto) {

    @IsOptional()
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;

}
