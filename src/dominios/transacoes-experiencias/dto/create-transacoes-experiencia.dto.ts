import { IsDateString, IsDefined, IsNumber, IsOptional, Min } from "class-validator";
import { IsIntFK } from "../../../validators/int-fk.validator";
import { IsUndefined } from "../../../validators/undefined.validator";

export class CreateTransacoesExperienciaDto {

    @IsUndefined()
    id: number;

    @IsDefined({ message: "Obrigatório." })
    @Min(0, { message: "Mínimo 0" })
    @IsNumber({}, { message: "Inválido." })
    valor: number;

    @IsDefined({ message: "Obrigatório." })
    @IsDateString({}, { message: "Inválida." })
    data: Date;

    @IsIntFK()
    @IsDefined({ message: "Obrigatório." })
    clienteId: number;

    @IsDefined({ message: "Obrigatório." })
    @IsIntFK()
    lojaId: number;

    @IsIntFK()
    colaboradorId: number;

}
