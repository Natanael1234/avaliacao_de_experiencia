
import { IsBoolean, IsDefined, IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { IsCPF } from "../../../validators/cpf.validator";
import { IsUndefined } from "../../../validators/undefined.validator";


export class CreateClienteDto {

    @IsUndefined()
    id: number;

    @IsDefined({ message: "Obrigatório." })
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;

    @IsDefined({ message: "Obrigatório." })
    @IsEmail({}, { message: "Inválido." })
    email: string;

    @IsDefined({ message: "Obrigatório." })
    @IsPhoneNumber('BR', { message: "Inválido." })
    telefone: string;

    @IsDefined({ message: "Obrigatório." })
    @IsCPF()
    cpf: string;

    @IsOptional()
    @IsBoolean({ message: "Inválido." })
    ativo: boolean;    

}
