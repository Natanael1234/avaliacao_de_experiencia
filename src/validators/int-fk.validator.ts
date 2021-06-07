import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'int-fk', async: false })
export class IsIntFRule implements ValidatorConstraintInterface {

    validate(fk: any, _args?: ValidationArguments): boolean | Promise<boolean> {
        if (!fk) return true;
        return Number.isInteger(fk) && fk > 0;
    }

    defaultMessage(_args: ValidationArguments) {
        return 'Relação inválida.';
    }

}

export function IsIntFK(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsIntFRule,
        });
    };
}
