import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'ativo', async: false })
export class AtivoValidator implements ValidatorConstraintInterface {

    validate(ativo: string, _args?: ValidationArguments): boolean | Promise<boolean> {
        if (ativo == null || ativo == undefined) return true;
        return typeof ativo == 'boolean';
    }

    defaultMessage(_args: ValidationArguments) {
        return 'Formato de dados inválido para campo ativo.';
    }

}
