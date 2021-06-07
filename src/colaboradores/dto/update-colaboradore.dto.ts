import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateColaboradoreDto } from './create-colaboradore.dto';

export class UpdateColaboradoreDto extends PartialType(CreateColaboradoreDto) {

    @IsOptional()
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;

}
