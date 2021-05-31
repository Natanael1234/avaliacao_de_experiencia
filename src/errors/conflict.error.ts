import { HttpError } from "./http.error";

/** Erro 409 - Conflict. */
export class ConflictError extends HttpError {

    constructor(message?: string) {
        super(message || 'Conflict', 409);
    }
}