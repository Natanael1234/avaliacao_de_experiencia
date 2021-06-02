import { validate, ValidationError, ValidatorOptions } from "class-validator";
import { BaseEntity } from "typeorm";
import { BadRequestError } from "../../errors/bad-request.error";
import { InternalServerError } from "../../errors/internal-server-error.error";

/**
 * 
 * @param entity 
 * @throws BadRequest - Falha de validação.
 */
export default async function validateEntity(entity: BaseEntity) {
    if (!entity) {
        throw new InternalServerError('Entidade indefinida.');
    }
    const options: ValidatorOptions = {
        validationError: {
            target: false,
            value: false
        }
    };
    const errors = (await validate(entity, options)).map((validationError: ValidationError) => {
        return {
            property: validationError.property,
            constraints: Object.values(validationError.constraints || {})
        };
    });
    if (errors?.length) { 
        throw new BadRequestError('Falha de validação.', errors);
    }

}

