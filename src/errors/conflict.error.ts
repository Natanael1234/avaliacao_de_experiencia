import { HttpError } from "./http.error";

/** Erro 409 - Conflict. */
export class ConflictError extends HttpError {

    constructor(message?: any, data?: any) {
        super(message || 'Conflict', 409, data);
    }
}