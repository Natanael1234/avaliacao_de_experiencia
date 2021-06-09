import { IsBoolean, IsDefined, IsEmail, IsEmpty, IsOptional, IsString, IS_LONGITUDE, MaxLength, MinLength } from "class-validator";
import { IsUndefined } from "../../../validators/undefined.validator";

export class CreateLojaDto {
    
    @IsUndefined()
    id: number;
    
    @IsDefined()
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;

}
