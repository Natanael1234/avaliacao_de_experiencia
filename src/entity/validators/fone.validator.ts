import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'fone', async: false })
export class FoneValidator implements ValidatorConstraintInterface {
    validate(fone: string, _args?: ValidationArguments): boolean | Promise<boolean> {
        if (fone == undefined || fone == null) return true;
        if (typeof fone != 'string') return false;
        if (fone == '') return true;
        return new RegExp(/^((\(\d{2}\)\s)|\d{2})\s*(\d{4,5}\-?\d{4})$/).test(fone);
    }

    defaultMessage(args: ValidationArguments) {
        if (typeof args.value != 'string') {
            return 'Formato de dados inválido para telefone.';
        }
        const digits = args.value?.replace(/\D/g, '');
        if (digits?.length < 10) {
            return 'Telefone deve conter no mínimo 10 dígitos.';
        } else if (digits?.length > 11) {
            return 'Telefone deve conter no máximo 11 dígitos.';
        }
        return 'Fone inválido';
    }



}
