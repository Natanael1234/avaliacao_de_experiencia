import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'cpf', async: false })
export class IsCPFRule implements ValidatorConstraintInterface {
    validate(cpf: string, _args?: ValidationArguments): boolean | Promise<boolean> {
        if (!cpf) return false;
        if (typeof cpf != 'string') return false;        
        if (!new RegExp(/^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/).test(cpf)) {
            return false;
        }
        let soma;
        let resto;
        soma = 0;
        cpf = cpf.replace(/\D/g, '');
        if (cpf == "00000000000") return false;

        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    defaultMessage(args: ValidationArguments) {        
        return 'Inválido.';
    }

}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCPFRule,
        });
    };
}
