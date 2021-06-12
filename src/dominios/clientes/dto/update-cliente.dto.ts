import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { IsCPF } from '../../../validators/cpf.validator';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @IsOptional()
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;
    @IsOptional()
    @IsEmail({}, { message: "Inválido." })
    email: string;
    @IsOptional()
    @IsPhoneNumber('BR', { message: "Inválido." })
    telefone: string;
    @IsOptional()
    @IsCPF()
    cpf: string;

}
