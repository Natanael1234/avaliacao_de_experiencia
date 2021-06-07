import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'int-id', async: false })
export class IsIntIdRule implements ValidatorConstraintInterface {

    validate(id: any, _args?: ValidationArguments): boolean | Promise<boolean> {
        if (!id) return true;
        return Number.isInteger(id) && id > 0;
    }

    defaultMessage(_args: ValidationArguments) {
        return 'Identificador inválido.';
    }

}

export function IsIntId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsIntIdRule,
        });
    };
}
