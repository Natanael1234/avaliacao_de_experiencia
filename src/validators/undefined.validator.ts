import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'undefined', async: false })
export class IsUndefinedRule implements ValidatorConstraintInterface {

    validate(value: string, _args?: ValidationArguments): boolean | Promise<boolean> {
        return value == undefined;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Dever ser indefinido.';
    }

}

export function IsUndefined(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUndefinedRule,
        });
    };
}
