import { IsDefined, IsString, MaxLength, MinLength } from "class-validator";
import { IsUndefined } from "../../../validators/undefined.validator";

export class CreateColaboradorDto {

    @IsUndefined()
    id: number;

    @IsDefined()
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    nome: string;    

}
