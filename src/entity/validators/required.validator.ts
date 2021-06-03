import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'required', async: false })
export class RequiredValidator implements ValidatorConstraintInterface {
    validate(value: string, _args?: ValidationArguments): boolean | Promise<boolean> {
        return value != undefined && value != null;
    }

    defaultMessage(_args: ValidationArguments) {        
        return 'Campo obrigatório.';
    }

}
