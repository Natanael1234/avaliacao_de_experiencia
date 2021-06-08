import { IsDefined, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { IsIntFK } from "../../../validators/int-fk.validator";
import { IsUndefined } from "../../../validators/undefined.validator";

export class CreateAvaliacoesExperienciaDto {

    @IsUndefined()
    id: number;

    @IsDefined({message: "Obrigatório."})
    @IsNumber({}, { message: "Inválida." })
    @Min(0, { message: "Mínimo 0" })
    @Max(0, { message: "Máximo 10" })
    nota: number;
    
    @IsDefined({message: "Obrigatório."})
    @IsString({ message: "Inválido." })
    @MinLength(6, { message: "Mínimo 6 caracteres." })
    @MaxLength(60, { message: "Máximo 60 caracteres." })
    comentario: string;
    
    @IsDefined({message: "Obrigatório."})
    @IsIntFK()
    transacaoExperienciaId: number;

}
