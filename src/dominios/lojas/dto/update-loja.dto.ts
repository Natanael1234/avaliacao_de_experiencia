import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateLojaDto } from './create-loja.dto';

export class UpdateLojaDto extends PartialType(CreateLojaDto) {
    
    @IsOptional()
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;
}
