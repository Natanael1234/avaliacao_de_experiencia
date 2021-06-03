import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'email', async: false })
export class EmailValidator implements ValidatorConstraintInterface {
    validate(email: string, _args?: ValidationArguments): boolean | Promise<boolean> {
        if (email == undefined || email == null) return true;
        if (typeof email != 'string') return false;
        if (email == '') return true;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    defaultMessage(args: ValidationArguments) {
        if (typeof args.value != 'string') {
            return 'Formato de dados inválido para email.';
        }
        return 'Email inválido';
    }



}
